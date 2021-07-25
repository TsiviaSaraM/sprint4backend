<template>
  <div class="space-filter">
    <form class="flex">
      <!-- <form @submit.prevent="setFilter" class="flex"> -->
      <input v-if="!showingFilters"
      class="start"
        @click="setShowFilters"
        type="text"
        placeholder="start your search"
      />
      <template v-if="showingFilters">
      <input
        class="big-screen"
        @input="setFilter"
        type="text"
        placeholder="location"
        v-model="filterBy.location"
      />

      <input type="number" placeholder="Guests" v-model="filterBy.numGuests" />
      <input
        type="date"
        placeholder="checkin"
        v-model="filterBy.dates.startDate"
      />
      <input
        type="date"
        placeholder="checkout"
        v-model="filterBy.dates.endDate"
      />
      <button @click="setFilter">search</button>
      </template>
    </form>
  </div>
</template>

<script>
export default {
  created(){
    console.log(this.showingFilters);
  },
  data() {
    return {
      filterBy: {
        amenity: "all",
        amenities: [],
        type: "all",
        location: "",
        numGuests: 0,
        dates: { startDate: 0, endDate: 0 },
        count: Infinity, //change this to PAGE_SIZE when add pagination
      },
      showFilters: this.screenWidth > 720,
    };
  },
  methods: {
    async setFilter() {
      try {
        await this.$store.commit({
          type: "setFilter",
          filterBy: this.filterBy,
        });
        this.$store.dispatch({ type: "loadSpaces" });
      } catch (err) {
        console.log("error in space filter", "this.filterBy");
        throw err;
      }
    },
    setShowFilters() {
      this.showFilters = true;
    },
  },
  computed: {
    showingFilters() {
      return this.showFilters;
    },
  },
};
</script>


