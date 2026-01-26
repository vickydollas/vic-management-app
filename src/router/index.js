import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/auth'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import EmployeeView from '../views/EmployeeView.vue'
import DepartmentView from '../views/DepartmentView.vue'
import AttendanceView from '../views/AttendanceView.vue'
import DesignDepartment from '../views/departments/DesignDepartment.vue'
import EngineeringDepartment from '../views/departments/EngineeringDepartment.vue'
import SalesDepartment from '../views/departments/SalesDepartment.vue'
import MarketingDepartment from '../views/departments/MarketingDepartment.vue'
import ProjectManagement from '../views/departments/ProjectManagement.vue'
import PayrollView from '../views/PayrollView.vue'
import JobsView from '../views/JobsView.vue'
import CandidateView from '../views/CandidateView.vue'
import LeaveView from '../views/LeaveView.vue'
import HolidaysView from '../views/HolidaysView.vue'
import SettingsView from '../views/SettingsView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true}
  },
  {
    path: '/employee',
    name: 'employees',
    component: EmployeeView,
    meta: { requiresAuth: true, role: 'hr_head'}
  },
  {
    path: '/department',
    name: 'department',
    component: DepartmentView
  },
  {
    path: '/department/design',
    name: 'department-design',
    component: DesignDepartment,
    props: true
  },
  {
    path: '/department/engineering',
    name: 'department-engineering',
    component: EngineeringDepartment,
    props: true
  },
  {
    path: '/department/sales',
    name: 'department-sales',
    component: SalesDepartment
  },
  {
    path: '/department/marketing',
    name: 'department-marketing',
    component: MarketingDepartment
  },
  {
    path: '/department/management',
    name: 'department-project-management',
    component: ProjectManagement
  },
  {
    path: '/attendance',
    name: 'attendance',
    component: AttendanceView,
    meta: { requiresAuth: true, role: 'hr_head'}
  },
  {
    path: '/payroll',
    name: 'payroll',
    component: PayrollView,
    meta: { requiresAuth: true, role: 'hr_head'}
  },
  {
    path: '/jobs',
    name: 'jobs',
    component: JobsView
  },
  {
    path: '/candidate',
    name: 'candidate',
    component: CandidateView,
    meta: { requiresAuth: true, role: 'hr_head'}
  },
  {
    path: '/leaves',
    name: 'leaves',
    component: LeaveView
  },
  {
    path: '/holiday',
    name: 'holiday',
    component: HolidaysView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const auth = useAuth()
  if (!auth.isLoggedIn.value && to.path !== '/login') {
    return next('/login')
  }
  if (to.meta.role && auth.state.user.role !== to.meta.role) {
    return next('/login')
  }
  // if (auth.state.user?.role !== to.meta.role) {
  //   return next('.login')
  // }
  next()
})

export default router