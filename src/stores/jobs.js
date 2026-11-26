import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const JOB_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'completed', label: 'Completed' },
]
export const EMPLOYMENT_TYPES = ['Full-Time', 'Part-Time', 'Internship', 'Contract']
export const WORK_STATIONS = ['Remote', 'Hybrid', 'Office']

const unique = (list) => [...new Set(list.filter(Boolean))].sort((a, b) => a.localeCompare(b))

export const useJobStore = defineStore(
  'jobs',
  () => {
    // job openings from /openings.json - reloaded on every visit, never persisted
    const baseJobs = ref([])
    // jobs added in the app - persisted
    const addedJobs = ref([])
    // edits made to jobs from the file, keyed by id - persisted
    const editedJobs = ref({})

    const isLoading = ref(false)
    const error = ref(null)
    let pending = null

    // newest additions first, then the original openings (with any edits applied)
    const jobs = computed(() => [
      ...addedJobs.value,
      ...baseJobs.value.map((j) => (editedJobs.value[j.id] ? { ...j, ...editedJobs.value[j.id] } : j)),
    ])

    // only jobs added in the app can be deleted
    const isAdded = (id) => addedJobs.value.some((j) => j.id === id)

    // suggestions for the form
    const departments = computed(() => unique(jobs.value.map((j) => j.department)))
    const scopes = computed(() => unique(jobs.value.map((j) => j.scope)))

    // load the file once; safe to call from any component
    function fetchJobs () {
      if (baseJobs.value.length) return Promise.resolve()
      if (pending) return pending
      isLoading.value = true
      error.value = null
      pending = axios
        .get('/openings.json')
        .then((response) => { baseJobs.value = response.data })
        .catch((err) => {
          console.error(err)
          error.value = 'Could not load jobs'
        })
        .finally(() => {
          isLoading.value = false
          pending = null
        })
      return pending
    }

    // form values -> the fields stored on a job record
    function toJobFields (input) {
      const max = Number(input.salaryMax)
      return {
        title: input.title.trim(),
        department: input.department.trim(),
        status: input.status,
        employment_type: input.employmentType,
        work_station: input.workStation,
        scope: input.scope.trim(),
        location: input.location.trim(),
        salary_min: Number(input.salaryMin) || max,
        salary_max: max,
        description: input.description.trim(),
      }
    }

    function addJob (input) {
      const job = {
        id: `job-${Date.now()}`,
        ...toJobFields(input),
        createdAt: new Date().toISOString(),
      }
      addedJobs.value.unshift(job)
      return job
    }

    function updateJob (id, input) {
      const current = jobs.value.find((j) => j.id === id)
      if (!current) return null
      const changes = { ...toJobFields(input), updatedAt: new Date().toISOString() }

      const index = addedJobs.value.findIndex((j) => j.id === id)
      if (index !== -1) {
        addedJobs.value[index] = { ...addedJobs.value[index], ...changes }
      } else {
        // job from the file: store the edit as an override
        editedJobs.value = { ...editedJobs.value, [id]: changes }
      }
      return { ...current, ...changes }
    }

    function deleteJob (id) {
      const index = addedJobs.value.findIndex((j) => j.id === id)
      if (index === -1) return null
      const [removed] = addedJobs.value.splice(index, 1)
      return removed
    }

    return {
      baseJobs,
      addedJobs,
      editedJobs,
      isLoading,
      error,
      jobs,
      departments,
      scopes,
      isAdded,
      fetchJobs,
      addJob,
      updateJob,
      deleteJob,
    }
  },
  {
    // saved to localStorage under the key "jobs"
    persist: { pick: ['addedJobs', 'editedJobs'] },
  }
)
