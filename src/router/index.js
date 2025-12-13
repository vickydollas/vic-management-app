import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmployeeView from '../views/EmployeeView.vue'
import DepartmentView from '../views/DepartmentView.vue'
import AttendanceView from '../views/AttendanceView.vue'
import DesignDepartment from '../views/departments/DesignDepartment.vue'
import EngineeringDepartment from '../views/departments/EngineeringDepartment.vue'
import SalesDepartment from '../views/departments/SalesDepartment.vue'
import MarketingDepartment from '../views/departments/MarketingDepartment.vue'
import ProjectManagement from '../views/departments/ProjectManagement.vue'
import PayrollView from '../views/PayrollView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/employee',
    name: 'employees',
    component: EmployeeView
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
    component: AttendanceView
  },
  {
    path: '/payroll',
    name: 'payroll',
    component: PayrollView
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

export default router
