<template>
  <div class="movie">
    <nav class="navigation">
      <router-link class="back-link" :to="{ name: 'movies-list' }">Back</router-link>
    </nav>
    <main v-if="movie" class="movie-detail">
        <div class="movie-poster">
          <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" :alt="movie.title" >
        </div>
        <div class="movie-informations">
          <h1>{{ movie.title }}</h1>
          <movie-rating :percentage="movie.vote_average * 10" size="medium" />
          <p class="info-row"><span class="bold">Duration:</span> {{ movie.runtime }}'</p>
          <p class="info-row"><span class="bold">Release date:</span> {{ new Date(movie.release_date).toLocaleDateString() }}</p>
          <p class="info-row"><span class="bold">Cast:</span> {{ movie.credits.cast | castDisplay }}</p>
          <p class="info-row"><span class="bold">Director:</span> {{ movie.credits.crew.find(member => member.job === 'Director').name }}</p>
          <a class="info-row" :href="movie.homepage"><span class="bold">Website:</span> {{ movie.homepage }}</a>
          <p class="info-row info-row--text">{{ movie.overview }}</p>
        </div>
    </main>
  </div>
</template>

<script>
import MovieRating from '@/components/MovieRating.vue'

export default {
  name: 'MovieDetails',
  created () {
    this.$store.dispatch('fetchMovieById', this.$route.params.id)
  },

  computed: {
    movie () {
      return this.$store.getters.getMovieById(this.$route.params.id)
    }
  },

  filters: {
    /**
     * @param {Array} cast
     * @returns {String}
     */
    castDisplay (cast) {
      return cast
        ? cast.slice(0, 4).map(actor => actor.name).join(', ')
        : ''
    },

    /**
     * @param {Array} crew
     * @returns {String}
     */
    directorDisplay (crew) {
      return crew
        ? crew.filter(member => member.job === 'Director').map(member => member.name).join(', ')
        : ''
    }
  },

  components: {
    MovieRating
  }
}
</script>

<style lang="stylus" scoped>
.movie
  padding 30px
  .movie-detail
    display flex
    justify-content flex-start
    .movie-poster
      box-shadow 1px 1px 4px black
      line-height 0px
    .movie-informations
      color beige
      margin-left 20px
      h1
        margin-bottom 20px
      .info-row
        margin-bottom 10px
        line-height 1.2rem
        color beige
        .bold
          font-weight bold
        &--text
          border: 1px solid beige
          padding 15px
          margin-top 40px
  .navigation
    display block
    margin-bottom 30px
    .back-link
      color beige
      font-weight bold
</style>
