<template>
  <section class="review-preview">
    <div class="review-details">
      <img :src="review.by.imgUrl" alt="" class="avatar" />
      <p class="user-name">{{ review.by.fullname }}</p>
    </div>
    <!-- <div class="review-txt">{{ review.txt }}</div> -->
    <show-more :text="review.txt" class="review-txt"></show-more>
  </section>
</template>

<script>
import showMore from './../show-more.vue';
export default {
  name: '',
  props: { review: Object },
  methods: {},
  components: { showMore },
};
</script>
