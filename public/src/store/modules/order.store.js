import { orderService } from '../../services/order.service.js';

export const orderStore = {
  state: {
    orders: [],
  },
  getters: {
    orders(state) {
      return state.orders;
    },
    // allOrders(state) {
    //   return state.orders;
    // },
    // filterBy(state) {
    //   return state.filterBy;
    // },
    // ordersInStock(state) {
    //   return state.orders.filter((order) => order.inStock);
    // },
  },
  mutations: {
    setOrders(state, { orders }) {
      state.orders = orders;
    },
    removeOrder(state, { orderId }) {
      const idx = state.orders.findIndex((t) => t._id === orderId);
      state.orders.splice(idx, 1);
    },
    updateOrder(state, { order }) {
      const idx = state.orders.findIndex((t) => t._id === order._id);
      state.orders.splice(idx, 1, order);
    },
    addOrder(state, { order }) {
      state.orders.push(order);
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    // addReview(state, { order }) {
    //   const idx = state.orders.findIndex((t) => t._id === order._id);
    //   state.orders.splice(idx, 1, order);
    // },
  },
  actions: {
    async loadOrders(context) {
      // orderService
      //   .query(context.getters.filterBy)
      //   .then((orders) => {
      //     context.commit({ type: 'setOrders', orders });
      //     return orders;
      //   })
      //   .catch((err) => {
      //     console.log('Cannot load orders', err);
      //     throw err;
      //   });
      try {
        // const orders = await orderService.query(context.getters.filterBy);
        const orders = await orderService.query();
        context.commit({ type: 'setOrders', orders });
        return orders;
      } catch (err) {
        console.log('Cannot load orders', orders);
        throw err;
      }
    },
    async removeOrder({ commit }, payload) {
      // console.log(payload.orderId);
      // return orderService
      //   .remove(payload.orderId)
      //   .then(() => {
      //     commit(payload);
      //   })
      //   .catch((err) => {
      //     console.log('Cannot remove order:', payload.orderId, err);
      //     throw err;
      //   });
      try {
        await orderService.remove(payload.orderId);
        commit(payload);
      } catch (err) {
        console.log('Cannot remove', orderId);
        throw err;
      }
    },
    async saveOrder({ commit }, payload) {
      const type = payload.order._id ? 'updateOrder' : 'addOrder';
      try {
        const savedOrder = await orderService.save(payload.order);
        commit({ type, order: savedOrder });
        return savedOrder;
      } catch (err) {
        console.log('Cannot save order', review, orderId);
        throw err;
      }
      // return orderService
      //   .save(payload.order)
      //   .then((savedOrder) => {
      //     commit({ type, order: savedOrder });
      //     return savedOrder;
      //   })
      //   .catch((err) => {
      //     console.log('Cannot save order:', payload.order, err);
      //     throw err;
      //   });
    },
  },
};
