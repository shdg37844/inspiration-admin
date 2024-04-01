import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import routes from './routes'
import NProgress from 'nprogress'
import userService from '@/services/user'
import permissionService from '@/services/permission'
import { useStore } from '@/stores/index.js'


const TOKEN_KEY = 'web_token'
const appRouter = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  }
})

appRouter.beforeEach(async (to, from, next) => {
  NProgress.start();

  if (to.meta.title) document.title = to.meta.title;

  const store = useStore();
  const token = Cookies.get(TOKEN_KEY);

  // 没有 TOKEN 的情况下的处理
  if (!token && !['AccountLogin'].includes(to.name)) {
    next({ name: 'AccountLogin' });
    return;
  }

  if (token) {
    try {
      // 直接从后端API获取用户信息和权限
      const userInfoResponse = await userService.getUserInfo();
      const permissionsResponse = await permissionService.permissions();

      // 更新Pinia状态管理中的用户信息和权限
      store.setUserInfo(userInfoResponse.data.userInfo);
      store.setPermissions(permissionsResponse.data.permissionSlug);

      

      // 没有任何权限要么跳走，要么去提示页面
      if (!permissionsResponse.data.permissionSlug?.length) {
        next({ name: 'Forbidden' });
        return;
      }

      // 如果路由需要特定权限，但用户没有此权限，则重定向
      if (to.meta.permission && !store.hasPermission(to.meta.permission)) {
        next({ name: 'Forbidden' });
        return;
      } 

    } catch (e) {
      // 这里重定向到登录页，并清除可能无效的Token
      Cookies.remove(TOKEN_KEY);
      next({ name: 'AccountLogin' });
      return;
    }
  }

  next();
});

// eslint-disable-next-line
appRouter.afterEach((to, from) => {
  NProgress.done()
})

export default appRouter
