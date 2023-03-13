import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardToken'),
    children: [
      {
        path: 'map',
        component: () => import('../views/MapView')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
