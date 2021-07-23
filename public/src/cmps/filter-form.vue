<template>
  <form @submit.prevent="setFilter" action="">
    <div class="flex">
      <label for="number">no. or guests</label>
      <input type="number" v-model="numGuests" id="number" />
    </div>
    <button>submit</button>
  </form>
</template>

<script>
export default {
    data(){
        return {
            numGuests: 0,
        }
    },
    methods:{
        setFilter(){
            console.log('setting the filter');
            this.$emit('set-filter', 'numGuests', this.numGuests)
            this.$emit('close-form')
        }
    }

};
</script>
