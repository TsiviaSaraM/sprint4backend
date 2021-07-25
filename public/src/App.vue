<template>
  <div id="app" class="container">
    <app-header />
    <router-view class="main-content" />
    <app-footer />
  </div>
</template>

<script>
import appHeader from './cmps/app-header.vue';
import appFooter from './cmps/app-footer.vue';

export default {
  data() {
    return {};
  },
  components: {
    appHeader,
    appFooter,
  },
};
</script>
