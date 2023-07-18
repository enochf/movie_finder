import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: { name: 'movies' } },
    { path: '/register', name: 'register', component: () => import('../views/Register.vue') },
    { path: '/login', name: 'login', component: () => import('../views/Login.vue') },
    { 
      path: '/movies',
      name: 'movies',
      component: () => import('../views/Movies.vue'),
      meta: {
        requiresAuth: true
      }
    },
    { 
      path: '/movies/:id',
      name: 'movieDetails',
      component: () => import('../views/MovieDetails.vue'),
      meta: {
        requiresAuth: true
      },
      props: true
    },
    { 
      path: '/binders',
      name: 'binders',
      component: () => import('../views/Binders.vue'),
      meta: {
        requiresAuth: true
      }
    },
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next()
    } else {
      next({name: 'login'})
    }
  } else {
    next()
  }
})

export default router
