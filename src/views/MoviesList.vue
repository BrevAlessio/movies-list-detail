<template>
  <div class="movies">
    <h1 class="page-title">Top Trending Movies</h1>
    <div class="movies-list">
      <router-link
        v-for="movie in movies"
        :key="movie.id"
        :to="{ name: 'movie-detail', params: { id: movie.id }}"
        class="movies-list__link"
      >
        <movie-item
          :title="movie.title"
          :posterSrc="`https://image.tmdb.org/t/p/w200/${movie.poster_path}`"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MovieItem from '@/components/MovieItem.vue'

export default {
  name: 'MoviesList',

  created () {
    this.$store.dispatch('fetchMovies')
  },

  computed: {
    ...mapGetters({
      moviesIdsList: 'getMoviesList',
      movieById: 'getMovieById'
    }),

    movies () {
      return this.moviesIdsList.map(id => this.movieById(id))
    }
  },

  components: {
    MovieItem
  }
}
</script>

<style lang="stylus">
.movies
  padding: 30px;
  h1
    margin-bottom: 30px;
  .movies-list
    display: flex
    flex-wrap: wrap
    justify-content: flex-start
    min-height: 100vh
    &__link
      margin: 10px
      &:last-child
        margin-right: auto
</style>
