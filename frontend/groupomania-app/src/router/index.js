import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'signin',
    component: () => import('../views/signin.vue')
  },
  {
    path: '/perso',
    name: 'perso',
    component: () => import('../views/perso.vue'),
  },
  {  
    path: '/wall',
    name: 'wall',
    component: () => import('../views/wall.vue')
  },
  {
    path: '/profil',
    name: 'profil',
    component: () => import('../views/profil.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const Access = ["/"]
  const pagesVerif = !Access.includes(to.path)
  const loggedIn = sessionStorage.getItem("userId")
  const sessionToken = sessionStorage.getItem("token")
  if (pagesVerif && !loggedIn && !sessionToken) {
      return next("/")
  }
  next()
})

export default router
