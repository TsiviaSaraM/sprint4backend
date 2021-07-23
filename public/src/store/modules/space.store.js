import { spaceService } from '../../services/space.service.js';

export const spaceStore = {
  state: {
    spaces: [],
    filterBy: {
      amenity: 'all',
      amenities: [],
      type: 'all',
      location: '',
      numGuests: 0,
      dates: { startDate: 0, endDate: 0 },
      count: Infinity, //change this to PAGE_SIZE when add pagination
    },
  },
  getters: {
    spaces(state) {
      return state.spaces;
    },
    // allSpaces(state) {
    //   return state.spaces;
    // },

    filterBy(state) {
      return state.filterBy;
    },
  },
  mutations: {
    setSpaces(state, { spaces }) {
      state.spaces = spaces;
    },
    removeSpace(state, { spaceId }) {
      const idx = state.spaces.findIndex((t) => t._id === spaceId);
      state.spaces.splice(idx, 1);
    },
    updateSpace(state, { space }) {
      const idx = state.spaces.findIndex((t) => t._id === space._id);
      state.spaces.splice(idx, 1, space);
    },
    addSpace(state, { space }) {
      state.spaces.push(space);
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    setFilterField(state, { field, value }) {
      console.log('setting filter field*****');
      state.filterBy[field] = value;
    },
    // addReview(state, { space }) {
    //   const idx = state.spaces.findIndex((t) => t._id === space._id);
    //   state.spaces.splice(idx, 1, space);
    // },
  },
  actions: {
    // async setFilterField(state, { field, value }) {
    //   state.filterBy[field] = value;
    // },
    async loadSpaces(context) {
      // spaceService
      //   .query(context.getters.filterBy)
      //   .then((spaces) => {
      //     context.commit({ type: 'setSpaces', spaces });
      //     return spaces;
      //   })
      //   .catch((err) => {
      //     console.log('Cannot load spaces', err);
      //     throw err;
      //   });
      try {
        const spaces = await spaceService.query(context.getters.filterBy);
        // const spaces = await spaceService.query();
        context.commit({ type: 'setSpaces', spaces });
        return spaces;
      } catch (err) {
        console.log('Cannot load spaces in store');
        throw err;
      }
    },
    async removeSpace({ commit }, payload) {
      // console.log(payload.spaceId);
      // return spaceService
      //   .remove(payload.spaceId)
      //   .then(() => {
      //     commit(payload);
      //   })
      //   .catch((err) => {
      //     console.log('Cannot remove space:', payload.spaceId, err);
      //     throw err;
      //   });
      try {
        await spaceService.remove(payload.spaceId);
        commit(payload);
      } catch (err) {
        console.log('Cannot remove', spaceId);
        throw err;
      }
    },
    async saveSpace({ commit }, payload) {
      const type = payload.space._id ? 'updateSpace' : 'addSpace';
      try {
        const savedSpace = await spaceService.save(payload.space);
        commit({ type, space: savedSpace });
        return savedSpace;
      } catch (err) {
        console.log('Cannot save space', review, spaceId);
        throw err;
      }
      // return spaceService
      //   .save(payload.space)
      //   .then((savedSpace) => {
      //     commit({ type, space: savedSpace });
      //     return savedSpace;
      //   })
      //   .catch((err) => {
      //     console.log('Cannot save space:', payload.space, err);
      //     throw err;
      //   });
    },
  },
};
