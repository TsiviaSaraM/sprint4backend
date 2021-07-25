<template>
  <ul class="review-list clear-list" v-if="reviews">
    <li
      v-for="(review, idx) in reviews"
      :key="idx"
      class="review-preview-container"
    >
      <review-preview :review="review" />
    </li>
  </ul>
</template>

<script>
import reviewPreview from './review-preview.vue';
export default {
  props: ['reviews'],
  name: 'reviewList',
  methods: {},
  components: {
    reviewPreview,
  },
};
</script>
