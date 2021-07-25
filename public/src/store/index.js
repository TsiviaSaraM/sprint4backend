import Vue from 'vue';
import Vuex from 'vuex';
import { spaceStore } from './modules/space.store.js';
import { orderStore } from './modules/order.store.js';
import { userStore } from './modules/user.store.js';
import { reviewStore } from './modules/review.store.js';
import { tripStore } from './modules/trip.store.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    screenWidth: window.innerWidth
  },
  getters:{
    screenWidth({ screenWidth }) { return screenWidth },
    isMobScreen({ screenWidth }) { return screenWidth <= 460 },
    isSmallScreen({ screenWidth }) { return screenWidth <= 720 },
  },
  mutations: {},
  actions: {},
  modules: {
    spaceStore,
    orderStore,
    userStore,
    reviewStore,
    tripStore
  },
});
