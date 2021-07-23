<template>
  <div class="nav-filter">
    <div class="space-types flex pointer">
      <p @click="updateFilter('type', 'home')">Homes</p>
      |
      <p @click="updateFilter('type', 'villa')">Villas</p>
      |
      <p @click="updateFilter('type', 'cabin')">Cabins</p>
      |
    </div>
    <el-row class="hover">
      <el-button @click="showFilterOptions()" round>Anytime</el-button>
      <el-button @click="toggleForm()" round>Guests</el-button>
      <el-button @click="showFilters()" round>Filters</el-button>
    </el-row>
    <filter-form v-if="isFormOpen" @set-filter="updateFilter" @close-form="toggleForm" />
  </div>
</template>

<script>
import filterForm from "./../filter-form.vue";
export default {
  name: "nav-filter",
  props: ["spaces"], //this is sent as a prop so the current display is filtered, not the entire database
  computed:{
    isFormOpen(){
      return this.formOpen
    }
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
        showFilterForm: false,
      },
      formOpen: false,
    };
  },
  created() {
    this.filterBy = this.$store.getters.filterBy;
  },
  methods: {
    closeForm() {
      this.showFilterForm = false;
    },
    async updateFilter(field, value) {
      console.log("setting filter...", this.filterBy);
      try {
        this.$store.commit({
          type: "setFilterField",
          field: field,
          value: value,
        });
        await this.$store.dispatch({ type: "loadSpaces" });
      } catch (err) {
        console.log("error in store moving to space-app from homepage", err);
        throw err;
      }
    },
    toggleForm(){
      this.formOpen = !this.formOpen
    },
    //TODO eventually combine the 3 functions below into  function
    // showFilterOptions() {},
    // showGuestOptions() {},
    // showFilters() {},
  },
  components: {
    filterForm,
  },
};
</script>
