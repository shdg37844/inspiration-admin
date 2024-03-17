const RoleIndex = () =>
  import(/* webpackChunkName: "permission" */ '@/views/Permission/RoleIndex.vue')
const RoleEdit = () =>
  import(/* webpackChunkName: "permission" */ '@/views/Permission/RoleEdit.vue')
const RoleShow = () =>
  import(/* webpackChunkName: "permission" */ '@/views/Permission/RoleShow.vue')
const ManagerIndex = () =>
  import(/* webpackChunkName: "permission" */ '@/views/Permission/ManagerIndex.vue')
const RoleCreate = () =>
  import(/* webpackChunkName: "permission" */ '@/views/Permission/RoleCreate.vue')
const ManagerCreate = () =>
  import(/* webpackChunkName: "permission" */ '@/views/Permission/ManagerCreate.vue')

export default [
  {
    path: '/permission',
    name: 'Permission',
    redirect: { name: 'RoleIndex' },
    meta: {
      permission: 'role-index',
      nav: {
        icon: 'icon-setting',
        title: '权限设置'
      },
      breadcrumb: {
        name: '权限',
        path: '/permission'
      }
    },
    children: [
      {
        path: 'role',
        name: 'RoleIndex',
        component: RoleIndex,
        meta: {
          permission: 'role-index',
          nav: {
            title: '角色列表'
          },
          breadcrumb: {
            name: '角色列表',
            path: '/permission/role'
          }
        },
      },
      {
        path: 'role/create',
        name: 'RoleCreate',
        component: RoleCreate,
        meta: {
          breadcrumb: {
            name: '角色创建',
            path: '/permission/role/create'
          }
        }
      },
      {
        path: 'role/:id',
        name: 'RoleShow',
        component: RoleShow
      },
      {
        path: 'role/:id/edit',
        name: 'RoleEdit',
        component: RoleEdit
      },
      {
        path: 'manager',
        name: 'ManagerIndex',
        component: ManagerIndex,
        meta: {
          permission: 'manager-index',
          nav: {
            title: '管理员'
          },
          breadcrumb: {
            name: '管理员',
            path: '/permission/manager'
          }
        }
      },
      {
        path: 'manager/create',
        name: 'ManagerCreate',
        component: ManagerCreate,
        meta: {
          breadcrumb: {
            name: '管理员创建',
            path: '/permission/manager/create'
          }
        }
      },
    ]
  }
]
