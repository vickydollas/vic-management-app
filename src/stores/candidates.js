import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

// pipeline stages, in order
export const CANDIDATE_STATUSES = ['In Progress', 'Selected', 'Rejected']

const today = () => new Date().toISOString().slice(0, 10)

export const useCandidateStore = defineStore(
  'candidates',
  () => {
    // candidates from /candidate.json - reloaded on every visit, never persisted
    const baseCandidates = ref([])
    // candidates added in the app - persisted
    const addedCandidates = ref([])
    // changes to candidates from the file (edits, status, hired), keyed by id - persisted
    const editedCandidates = ref({})

    const isLoading = ref(false)
    const error = ref(null)
    let pending = null

    const candidates = computed(() => [
      ...addedCandidates.value,
      ...baseCandidates.value.map((c) =>
        editedCandidates.value[c.id] ? { ...c, ...editedCandidates.value[c.id] } : c
      ),
    ])

    // suggestions for the "Applied for" field
    const positions = computed(() =>
      [...new Set(candidates.value.map((c) => c.position_applied).filter(Boolean))].sort()
    )

    // only candidates added in the app can be deleted
    const isAdded = (id) => addedCandidates.value.some((c) => c.id === id)

    // load the file once; safe to call from any component
    function fetchCandidates () {
      if (baseCandidates.value.length) return Promise.resolve()
      if (pending) return pending
      isLoading.value = true
      error.value = null
      pending = axios
        .get('/candidate.json')
        .then((response) => { baseCandidates.value = response.data })
        .catch((err) => {
          console.error(err)
          error.value = 'Could not load candidates'
        })
        .finally(() => {
          isLoading.value = false
          pending = null
        })
      return pending
    }

    // apply changes to one candidate, wherever it lives
    function patch (id, changes) {
      const index = addedCandidates.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        addedCandidates.value[index] = { ...addedCandidates.value[index], ...changes }
      } else {
        editedCandidates.value = {
          ...editedCandidates.value,
          [id]: { ...editedCandidates.value[id], ...changes },
        }
      }
    }

    // form values -> the fields stored on a candidate record
    const toCandidateFields = (input) => ({
      imagePath: input.imagePath,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone_number: input.phone.trim(),
      position_applied: input.position.trim(),
      application_date: input.applicationDate || today(),
      status: input.status,
      notes: input.notes?.trim() || '',
    })

    function addCandidate (input) {
      const candidate = {
        id: `cand-${Date.now()}`,
        ...toCandidateFields(input),
        createdAt: new Date().toISOString(),
      }
      addedCandidates.value.unshift(candidate)
      return candidate
    }

    function updateCandidate (id, input) {
      const current = candidates.value.find((c) => c.id === id)
      if (!current) return null
      const changes = { ...toCandidateFields(input), updatedAt: new Date().toISOString() }
      patch(id, changes)
      return { ...current, ...changes }
    }

    // move one or many candidates to a pipeline stage
    function setStatus (ids, status) {
      const now = new Date().toISOString()
      ids.forEach((id) => patch(id, { status, updatedAt: now }))
    }

    // remember which employee record a candidate became
    function markHired (id, employeeId) {
      patch(id, { status: 'Selected', hiredEmployeeId: employeeId, hiredAt: new Date().toISOString() })
    }

    // deletes the added candidates among `ids`; returns the removed records
    function deleteCandidates (ids) {
      const remove = new Set(ids)
      const removed = addedCandidates.value.filter((c) => remove.has(c.id))
      addedCandidates.value = addedCandidates.value.filter((c) => !remove.has(c.id))
      return removed
    }

    return {
      baseCandidates,
      addedCandidates,
      editedCandidates,
      isLoading,
      error,
      candidates,
      positions,
      isAdded,
      fetchCandidates,
      addCandidate,
      updateCandidate,
      setStatus,
      markHired,
      deleteCandidates,
    }
  },
  {
    // saved to localStorage under the key "candidates"
    persist: { pick: ['addedCandidates', 'editedCandidates'] },
  }
)
