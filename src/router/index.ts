import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import axios from 'axios'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const checkAuthentication = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (to.matched.some((route) => route.meta.noneAuth)) {
    next()
    return
  }
  const store = useSessionStore()
  try {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        console.log(user)
        store.setアカウント({
          アカウントid: user.uid,
          アカウント名: user.displayName
        })
      } else {

      }
    })
  } catch (error: any) {
    if (error.response.status === 401) {
      goToSessionExpire()
      return
    }
    errorStatus(error.response.status)
  }

  // await axios
  //   .get('')
  //   .then((response) => {
  //     store.setアカウント(response.data)
  //   })
  //   .catch((error) => {
  //     if (error.response.status === 401) {
  //       goToSessionExpire()
  //       return
  //     }
  //     errorStatus(error.response.status)
  //   })
  if (store.ログイン済みである) {
    if (to.fullPath !== "/") {
      sessionStorage.setItem("redirect", to.fullPath)
    }
    next({ name: 'Login' })
    return
  }
  next()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/index.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: { title: "ログイン", noneAuth: true }
    },
    {
      path: '/profile/setting',
      name: 'ProfileSetting',
      component: () => import('../views/profile/setting/index.vue'),
      meta: { title: "アカウント設定" }
    },
    {
      path: '/list',
      name: 'List',
      component: () => import('../views/list/index.vue'),
      meta: { title: "登録" }
    },

  ]
})

router.beforeEach(checkAuthentication)

router.afterEach(
  (to: RouteLocationNormalized) => {
    if (to.path === '/error') return
    document.title =
      to.meta && to.meta.title
        ? to.meta.title + " | どんぐりショップ"
        : "どんぐりショップ"
  }
)

export const goToErrorPage = async (errorMessage: string, status: number) => {
  await router.replace({
    name: "Error",
    params: {
      errorMessage: errorMessage,
      code: status
    }
  })
}

export const goToSessionExpire = () => {
  router.replace({
    name: 'Login',
    query: { type: 'timeout' }
  })
}

const errorStatus = async (code: number) => {
  if (code === 404) await goToErrorPage('ページが存在しません', 404)
  if (code === 503) await goToErrorPage('ただいまメンテナンス中です。\nメンテナンス終了までしばらくお待ちください', 503)
}

export default router
