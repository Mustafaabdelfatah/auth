export const auth = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/auth/login.vue'),
    requiresAuth: false,
    meta: {
      name: 'تسجيل الدخول'
    }
  },
  {
    name: 'forgot-password',
    path: '/forgot-password',
    component: () => import('@/views/auth/forgotPassword.vue'),
    requiresAuth: false,
    meta: {
      name: 'إسترجاع كلمة المرور'
    }
  },
  {
    name: 'new-password',
    path: '/new-password',
    component: () => import('@/views/auth/newPassword.vue'),
    requiresAuth: false,
    meta: {
      name: 'تعيين كلمة مرور'
    }
  }
]
