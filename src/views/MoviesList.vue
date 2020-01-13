<template>
  <div class="movies">
    <h1 class="page-title">Top Trending Movies</h1>
    <div class="movies-list">
      <router-link
        v-for="movie in movies"
        :key="movie.id"
        :to="{ name: 'movie-details', params: { id: movie.id }}"
        class="movies-list__link"
      >
        <movie-item
          :title="movie.title"
          :posterSrc="`https://image.tmdb.org/t/p/w200/${movie.poster_path}`"
        />
        <movie-rating :percentage="movie.vote_average * 10" size="small" class="rating" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MovieItem from '@/components/MovieItem.vue'
import MovieRating from '@/components/MovieRating.vue'

export default {
  name: 'MoviesList',

  created () {
    this.$store.dispatch('fetchMovies')
  },

  computed: {
    ...mapGetters({
      movies: 'getMoviesList'
    })
  },

  components: {
    MovieItem,
    MovieRating
  }
}
</script>

<style lang="stylus">
.movies
  padding 30px
  h1
    margin-bottom 30px
  .movies-list
    display flex
    flex-wrap wrap
    justify-content flex-start
    min-height 100vh
    &__link
      margin 10px
      position relative
      &:last-child
        margin-right auto
      .rating
        position absolute
        top -10px
        right -45px
</style>
