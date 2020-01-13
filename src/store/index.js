import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export const actions = {

  /**
   * @description fetches a list of trending movies fromm apis and sets them in the state
   * @returns {Promise}
   */
  fetchMovies ({ commit }) {
    return axios.get(`${process.env.VUE_APP_MDB_ENDPOINT}/trending/movie/week`)
      .then(({ data }) => {
        commit('setMoviesList', data.results)
        data.results.forEach(movie => {
          commit('setMovie', movie)
        })
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
    return axios.get(`${process.env.VUE_APP_MDB_ENDPOINT}/movie/${id}`, {})
      .then(({ data }) => {
        commit('setMovie', data)
        return data
      })
      .catch(e => e)
  }
}

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
    state.moviesList = moviesList.mpa(movie => movie.id)
  },
  setMovie (state, movie) {
    Vue.set(state.moviesIds, movie.id, movie)
  }
}

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state
})
