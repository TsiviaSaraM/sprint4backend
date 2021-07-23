
export const tripStore = {
  state: {
    trip: {
        "startDate": "g",
        "endDate": "g",
        "guests":null,
    //     "guests": {
    //       "adults":,
    //       "kids": 1
    //     },
        dest: {
          "country": "g",
          "countryCode": "g",
          "address": "g",
          "lat": null,
          "lng":null
        }
    }
    
  },
  getters: {
    trip(state) {
      return state.trip;
    },
    // allTrips(state) {
    //   return state.trips;
    // },
    // filterBy(state) {
    //   return state.filterBy;
    // },
    // tripsInStock(state) {
    //   return state.trips.filter((trip) => trip.inStock);
    // },
  },
  mutations: {
    setTrips(state, { trips }) {
      state.trips = trips;
    },


    updateTrip(state, { trip }) {
      state.trips = trip;
    },

    // tripToOrder(context){
        
    //         this.saveOrder(this.trip)

    //     }
  },
  actions: {

   async tripToOrder(context){
        

    commit
        const order = this.trip
        console.log(order);
        this.$store.dispatch({ type: "saveOrder"  ,order});

    },

    







    async loadTrips(context) {
      // tripService
      //   .query(context.getters.filterBy)
      //   .then((trips) => {
      //     context.commit({ type: 'setTrips', trips });
      //     return trips;
      //   })
      //   .catch((err) => {
      //     console.log('Cannot load trips', err);
      //     throw err;
      //   });
      try {
        // const trips = await tripService.query(context.getters.filterBy);
        const trips = await tripService.query();
        context.commit({ type: 'setTrips', trips });
        return trips;
      } catch (err) {
        console.log('Cannot load trips', trips);
        throw err;
      }
    },
    async removeTrip({ commit }, payload) {
      // console.log(payload.tripId);
      // return tripService
      //   .remove(payload.tripId)
      //   .then(() => {
      //     commit(payload);
      //   })
      //   .catch((err) => {
      //     console.log('Cannot remove trip:', payload.tripId, err);
      //     throw err;
      //   });
      try {
        await tripService.remove(payload.tripId);
        commit(payload);
      } catch (err) {
        console.log('Cannot remove', tripId);
        throw err;
      }
    },
    async saveTrip({ commit }, payload) {
      const type = payload.trip._id ? 'updateTrip' : 'addTrip';
      try {
        const savedTrip = await tripService.save(payload.trip);
        commit({ type, trip: savedTrip });
        return savedTrip;
      } catch (err) {
        console.log('Cannot save trip', review, tripId);
        throw err;
      }
      // return tripService
      //   .save(payload.trip)
      //   .then((savedTrip) => {
      //     commit({ type, trip: savedTrip });
      //     return savedTrip;
      //   })
      //   .catch((err) => {
      //     console.log('Cannot save trip:', payload.trip, err);
      //     throw err;
      //   });
    },
  },
};
