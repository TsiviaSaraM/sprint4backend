<template>
  <section class="date-picker">
    <el-date-picker
      @change="date"
      v-model="dates"
      type="daterange"
      range-separator=""
      start-placeholder="CHECK-IN"
      end-placeholder="CHECKOUT"
    >
    </el-date-picker>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dates: '',
    };
  },

  methods: {
    date() {
      this.$emit('dateToReserve', this.dates);
    },
  },
};
</script>
