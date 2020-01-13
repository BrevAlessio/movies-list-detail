import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/repository/http-client.js'
Vue.use(Vuex)

// inject http client dependency for better unit testing
export const actions = (HttpClient = axios) => ({

  /**
   * @description fetches a list of trending movies fromm apis and sets them in the state
   * @returns {Promise}
   */
  fetchMovies ({ commit }) {
    return HttpClient.get(`${process.env.VUE_APP_MDB_ENDPOINT}/trending/movie/week`)
      .then(({ data }) => {
        commit('setMoviesList', data.results)
        return data
      })
      .catch(e => e)
  },

  /**
   * @description fetches a single movie by id and sets it in the state
   * @param {String} id
   * @returns {Promise}
   */
  fetchMovieById ({ commit }, id) {
    return HttpClient.get(`${process.env.VUE_APP_MDB_ENDPOINT}/movie/${id}`, {})
      .then(async ({ data }) => {
        data.credits = await HttpClient.get(`${process.env.VUE_APP_MDB_ENDPOINT}/movie/${id}/credits`, {})
          .then(({ data }) => data)
          .catch(e => null)

        commit('setMovie', data)
        return data
      })
      .catch(e => e)
  }
})

export const state = {
  // list of movie ids
  moviesList: [],
  // actual movies objects, with their ids as prop names
  moviesIds: {}
}

export const getters = {
  getMoviesList: state => state.moviesList,
  getMovieById: state => id => state.moviesIds[id]
}

export const mutations = {
  setMoviesList (state, moviesList) {
    state.moviesList = moviesList
  },
  setMovie (state, movie) {
    Vue.set(state.moviesIds, movie.id, movie)
  }
}

export default new Vuex.Store({
  actions: actions(),
  getters,
  mutations,
  state
})
