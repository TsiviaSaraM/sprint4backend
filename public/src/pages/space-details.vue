<template>
  <div class="space-details main-layout">
    <h2 class="space-title-primary">{{ space.name }}</h2>
    <div class="space-title-secondary">
      <div class="left-part">
        <div class="rating">
          <p class="total-rate">{{ totalRate }}</p>
          <p class="number-reviews">({{ numOfReviews }} reviews)</p>
        </div>
        <span>•</span>
        <div class="space-location">
          {{ space.loc.address }}
        </div>
      </div>
      <div class="save-space">Save</div>
    </div>
    <space-imgs :imgUrls="space.imgUrls" />

    <div class="space-description-container">
      <div class="space-description-wrap">
        <div class="space-description-title">
          <p class="title-sentence">
            Entire {{ space.type }}, hosted by {{ host.fullname }}
          </p>
          <img class="avatar" :src="host.imgUrl" alt="" />
        </div>

        <show-more
          :text="space.description"
          class="space-description"
        ></show-more>
        <div class="space-ameneties">
          <p class="ameneties-title">What this place offers</p>
          <ul class="space-ameneties-list clear-list">
            <li
              v-for="(amenity, idx) in space.amenities"
              :key="idx"
              class="amenity-item"
              :class="icon(amenity)"
            >
              {{ amenity }}
            </li>
          </ul>
        </div>
      </div>

      <space-reserve
        :space="space"
        :rate="totalRate"
        :reviews="numOfReviews"
        @reserve="reserveToSave"
      />
    </div>
    <div class="reviews-container">
      <div class="rating">
        <p class="total-rate star">{{ totalRate }}</p>
        <span>•</span>
        <p class="number-reviews">({{ numOfReviews }})</p>
      </div>
      <ul class="rate-categories-list clear-list">
        <li
          class="rate-categories-item"
          v-for="(r, c, idx) in categoryRate"
          :key="idx"
        >
          <div class="category-title">{{ c }}:</div>
          <div class="box">
            <div class="category-bar-container">
              <div class="category-bar" :style="{ width: r * 20 + '%' }"></div>
            </div>
            <div class="category-rate">{{ r.toFixed(1) }}</div>
          </div>
        </li>
      </ul>
      <review-list :reviews="space.reviews"></review-list>
    </div>
    <div class="map-container" v-if="this.space.loc.lat">
      <p class="map-title">Where you'll be</p>
      <google-maps :loc="space.loc" v-if="space.loc.lat"></google-maps>
      <div class="" v-else>loading</div>
      <p class="space-location">{{ space.loc.address }}</p>
    </div>
  </div>
</template>

<script>
import chatApp from './../cmps/space-details/chat-app.vue';
import orderForm from './../cmps/space-details/order-form.vue';
import reviewList from './../cmps/space-details/review-list.vue';
import spaceImgs from './../cmps/space-details/space-imgs.vue';
import googleMaps from './../cmps/google-maps.vue';
import showMore from './../cmps/show-more.vue';
import { spaceService } from '../services/space.service.js';
import spaceReserve from './../cmps/space-details/space-reserve.vue';

export default {
  name: 'space-details',

  data() {
    return {
      space: {
        loc: {},
        reviews: [],
      },
      host: {},
    };
  },

  computed: {
    totalRate() {
      const { reviews } = this.space;
      if (!reviews) return;
      const sums = reviews.map((r) => {
        const rateCategory = Object.values(r.rate);
        return rateCategory.reduce((acc, rc) => {
          return (acc += rc);
        }, 0);
      });
      const sum = sums.reduce((acc, ps) => {
        return (acc += ps);
      }, 0);
      return (sum / (reviews.length * 6)).toFixed(2);
    },

    numOfReviews() {
      return this.space.reviews.length;
    },

    categoryRate() {
      const { reviews } = this.space;
      const acc = {
        accuracy: 0,
        checkin: 0,
        cleanliness: 0,
        communication: 0,
        value: 0,
        location: 0,
      };
      return reviews.reduce((acc, r) => {
        acc.accuracy += r.rate.accuracy;
        acc.checkin += r.rate.checkin;
        acc.communication += r.rate.communication;
        acc.cleanliness += r.rate.cleanliness;
        acc.value += r.rate.value;
        acc.location += r.rate.location;
        return acc;
      }, acc);
    },
  },

  methods: {
    icon(amenity) {
      return amenity.toLowerCase().replace(' ', '-');
    },
    reserveToSave(reserve) {
      console.log(reserve);
      const order = reserve;
      // this.$store.dispatch({ type: "saveOrder"  ,order});
      // tripToOrder
      this.$store.dispatch({ type: 'tripToOrder' });
      // this.store.$commit('tripToOrder')
    },
  },

  watch: {
    '$route.params.spaceId': {
      immediate: true,
      async handler() {
        const { spaceId } = this.$route.params;
        try {
          const space = await spaceService.getById(spaceId);
          this.space = space;
          this.host = space.host;
        } catch (error) {
          console.log('cannot get space', space);
        }
      },
    },
  },
  components: {
    chatApp,
    orderForm,
    reviewList,
    spaceImgs,
    googleMaps,
    showMore,
    spaceReserve,
  },
};
</script>
