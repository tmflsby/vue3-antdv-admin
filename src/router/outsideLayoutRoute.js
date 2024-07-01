// 登录路由
const LoginRoute = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/LoginView.vue'),
  meta: {
    title: '登录'
  }
}

// 404
const NotFoundRoute = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/views/404/NotFoundView.vue'),
  meta: {
    title: '404'
  }
}

export default [LoginRoute, NotFoundRoute]
