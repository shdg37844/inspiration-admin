import BasicLayout from '@/components/Layout/BasicLayout.vue'
import Home from '@/views/HomeIndex.vue'
import NotFound from '@/views/Common/NotFound.vue'
import Forbidden from '@/views/Common/Forbidden.vue'
import AccountLogin from '@/views/Common/AccountLogin.vue'

import routesPermission from './routesPermission'
import routesInspiration from './routesInspiration'

export default [
  {
    path: '/',
    name: 'Root',
    component: BasicLayout,
    redirect: {
      name: 'Home'
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      ...routesPermission,
      ...routesInspiration
    ]
  },
  {
    path: '/login',
    name: 'AccountLogin',
    component: AccountLogin
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: Forbidden
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
]
