<template>
  <svg viewBox="0 0 36 36" class="circular-chart" :class="`circular-chart--${size}`">
  <path class="circle"
    :stroke-dasharray="`${percentage}, 100`"
    d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
  />
  <text x="18" y="20.35" class="percentage">{{ percentage }}%</text>
</svg>
</template>

<script>
export default {
  name: 'MovieRating',
  props: {
    percentage: {
      type: Number,
      required: true
    },
    size: {
      type: String,
      default: 'small',
      validator: value => [ 'small', 'medium', 'large' ].includes(value)
    }
  }
}
</script>

<style lang="stylus" scoped>
.circular-chart
  display: block
  margin: 20px 0px
  max-width: 80%
  &--small
    max-height: 40px
  &--medium
    max-height: 80px
  &--large
    max-height: 120px

.circle
  stroke: #4CC790
  fill: none
  stroke-width: 2.8
  stroke-linecap: round
  animation: progress 1s ease-out forwards

@keyframes progress
  0%
    stroke-dasharray: 0 100
.percentage
  fill: beige
  font-family: sans-serif
  font-size: 0.5em
  text-anchor: middle
</style>
