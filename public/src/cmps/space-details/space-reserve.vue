<template>
  <section class="space-reserve">
    <!-- <section class="space-reserve-box"> -->
    <div class="space-reserve-details">
      <p class="price">
        <span>{{ space.price }}</span> / night
      </p>

      <div class="rating">
        <p class="total-rate star">{{ rate }}</p>
        <span>•</span>
        <p class="number-reviews">({{ reviews }} reviews)</p>
      </div>
    </div>

    <form @submit.prevent="submit" value="value" class="space-reserve-form">
      <reserve-date @dateToReserve="dateToReserve2" />
      <!-- <reserve-guests @guestsToSave="guestsToSave2" /> -->
      <reserve-guests2 :limit="space.capacity" @guestsCnt="guestsToSave2" />
      <button>Book</button>
    </form>
  </section>
  <!-- </section> -->
</template>

<script>
import reserveDate from './reserve-date.vue';
import reserveGuests from './reserve-guests.vue';
import reserveGuests2 from './reserve-guests2.vue';

export default {
  // props: { space: Object, rate: Number, reviews: Number },
  props: ['space', 'rate', 'reviews'],
  data() {
    return {
      reserve: {
        date: {
          start: '',
          end: '',
        },
        guests: 1,
        // guests:{
        //     adults:null
        // }
      },
    };
  },

  methods: {
    submit(value) {
      // console.log(value);
      this.$emit('reserve', this.reserve);
    },
    dateToReserve2(date) {
      this.reserve.date.start = date[0];
      this.reserve.date.end = date[1];
      // console.log('start',this.reserve.date.start,'end',this.reserve.date.end);
    },
    guestsToSave2(guests) {
      this.reserve.guests = guests;
    },
  },

  components: {
    reserveDate,
    reserveGuests,
    reserveGuests2,
  },
};
</script>

<style scoped></style>
