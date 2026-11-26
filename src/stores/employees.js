import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const AVATARS = [
  '/images/profile1.jpg',
  '/images/profile2.jpg',
  '/images/profile3.png',
  '/images/profile4.png',
  '/images/profile5.jpg',
  '/images/profile6.jpg',
  '/images/profile7.jpg',
]

export const WORK_TYPES = ['Hybrid', 'Office', 'Remote']
export const EMPLOYMENT_STATUSES = ['Permanent', 'Contract', 'Probation', 'Temporary']

const formatMoney = (value) => `$${Math.round(value).toLocaleString('en-US')}`

// "$60,000" -> 60000, "-" -> ""
export const parseMoney = (text) => {
  const n = Number(String(text ?? '').replace(/[^0-9.]/g, ''))
  return n > 0 ? n : ''
}

// form values -> the fields stored on an employee record
function toEmployeeFields (input) {
  return {
    imagePath: input.imagePath || AVATARS[0],
    name: input.name.trim(),
    department: input.department,
    title: input.title.trim(),
    type: input.type,
    status: input.status,
    location: input.location?.trim() || '',
  }
}

// recalculate CTC / monthly pay from the annual salary in the form
function toSalary (annualSalary, previous = {}) {
  const annual = Number(annualSalary)
  const hasSalary = Number.isFinite(annual) && annual > 0
  return {
    deduction: '-',
    ...previous,
    perYear: hasSalary ? formatMoney(annual) : '-',
    amount: hasSalary ? formatMoney(annual / 12) : '-',
    // a newly paid employee starts as "Pending"; keep any existing status; no salary -> no status
    transaction: hasSalary ? previous.transaction || 'Pending' : '',
  }
}

export const useEmployeeStore = defineStore(
  'employees',
  () => {
    // employees from /jobs2.json - reloaded on every visit, never persisted
    const baseEmployees = ref([])
    // employees added in the app - persisted
    const addedEmployees = ref([])
    // edits made to employees from the file, keyed by id - persisted
    const editedEmployees = ref({})

    const isLoading = ref(false)
    const error = ref(null)
    let pending = null

    // newest additions first, then the original list (with any edits applied)
    const employees = computed(() => [
      ...addedEmployees.value,
      ...baseEmployees.value.map((e) =>
        editedEmployees.value[e.id] ? { ...e, ...editedEmployees.value[e.id] } : e
      ),
    ])

    const departments = computed(() =>
      [...new Set(employees.value.map((e) => e.department).filter(Boolean))].sort()
    )

    // only employees added in the app can be deleted
    const isAdded = (id) => addedEmployees.value.some((e) => e.id === id)

    // load the file once; every component can call this safely
    function fetchEmployees () {
      if (baseEmployees.value.length) return Promise.resolve()
      if (pending) return pending
      isLoading.value = true
      error.value = null
      pending = axios
        .get('/jobs2.json')
        .then((response) => { baseEmployees.value = response.data })
        .catch((err) => {
          console.error(err)
          error.value = 'Could not load employees'
        })
        .finally(() => {
          isLoading.value = false
          pending = null
        })
      return pending
    }

    // unique 8-digit employee ID
    function generateIdentityNum () {
      const taken = new Set(employees.value.map((e) => e.identityNum))
      let id
      do {
        id = String(Math.floor(10000000 + Math.random() * 90000000))
      } while (taken.has(id))
      return id
    }

    function addEmployee (input) {
      const employee = {
        id: `emp-${Date.now()}`,
        identityNum: input.identityNum || generateIdentityNum(),
        ...toEmployeeFields(input),
        role: 'employee',
        // no attendance record yet
        truth: '',
        time: '',
        salary: toSalary(input.annualSalary),
        createdAt: new Date().toISOString(),
      }
      addedEmployees.value.unshift(employee)
      return employee
    }

    function updateEmployee (id, input) {
      const current = employees.value.find((e) => e.id === id)
      if (!current) return null

      // only recalculate pay when the annual salary was actually changed,
      // so untouched payroll figures from the file stay exactly as they were
      const salaryChanged = parseMoney(current.salary?.perYear) !== (Number(input.annualSalary) || '')
      const changes = {
        ...toEmployeeFields(input),
        salary: salaryChanged ? toSalary(input.annualSalary, current.salary) : current.salary,
        updatedAt: new Date().toISOString(),
      }

      const index = addedEmployees.value.findIndex((e) => e.id === id)
      if (index !== -1) {
        addedEmployees.value[index] = { ...addedEmployees.value[index], ...changes }
      } else {
        // file employee: store the edit as an override
        editedEmployees.value = { ...editedEmployees.value, [id]: changes }
      }
      return { ...current, ...changes }
    }

    function deleteEmployee (id) {
      const index = addedEmployees.value.findIndex((e) => e.id === id)
      if (index === -1) return null
      const [removed] = addedEmployees.value.splice(index, 1)
      return removed
    }

    return {
      baseEmployees,
      addedEmployees,
      editedEmployees,
      isLoading,
      error,
      employees,
      departments,
      isAdded,
      fetchEmployees,
      generateIdentityNum,
      addEmployee,
      updateEmployee,
      deleteEmployee,
    }
  },
  {
    // saved to localStorage under the key "employees"
    persist: {
      pick: ['addedEmployees', 'editedEmployees'],
    },
  }
)
