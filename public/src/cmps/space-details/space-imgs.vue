<template>
  <div class="space-imgs pics-5">
    <img :src="img" alt="" v-for="(img, idx) in imgUrls" :key="idx" />
  </div>
</template>

<script>
export default {
  props: { imgUrls: Array },
};
</script>

<style></style>
