<template>
  <article class="movie">
    <img :src="posterSrc" :alt="title" :title="title">
  </article>
</template>

<script>
export default {
  name: 'MovieItem',
  props: {
    title: {
      type: String,
      required: true
    },
    posterSrc: {
      type: String,
      default: 'http://placehold.it/300x200'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .movie
    box-shadow 1px 1px 4px black
    line-height 0px
</style>
