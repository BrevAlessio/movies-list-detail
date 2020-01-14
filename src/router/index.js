import Vue from 'vue'
import VueRouter from 'vue-router'
import MoviesList from '../views/MoviesList.vue'
import MovieDetails from '../views/MovieDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'movies-list',
    component: MoviesList
  },
  {
    path: '/movie-details/:id',
    name: 'movie-details',
    component: MovieDetails
  }
]

const router = new VueRouter({
  routes
})

export default router
