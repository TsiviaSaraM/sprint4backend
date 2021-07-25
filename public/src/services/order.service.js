import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';

const ORDERS_KEY = 'orders';
_createOrders();

export const orderService = {
  query,
  remove,
  save,
  getEmptyOrder,
  getById,
};

function query() {
  return storageService.query(ORDERS_KEY);
}

function remove(orderId) {
  return storageService.remove(ORDERS_KEY, orderId);
}

function save(order) {
  if (order._id) {
    return storageService.put(ORDERS_KEY, order);
  } else {
    return storageService.post(ORDERS_KEY, order);
  }
}

function getById(orderId) {
  return storageService.get(ORDERS_KEY, orderId);
}

function getEmptyOrder() {
  return {
    _id: '',
    hostId: '',
    createdAt: Date.now(),
    buyer: {
      _id: '',
      fullname: '',
    },
    totalPrice: 0,
    startDate: '',
    endDate: '',
    guests: {
      adults: 0,
      kids: 0,
    },
    stay: {
      _id: '',
      name: '',
      price: 0,
    },
    status: '',
  };
}

async function _createOrders() {
  let orders = await storageService.query(ORDERS_KEY);
  if (!orders || !orders.length) {
    orders = [];
    orders.push({
      _id: 'o1225',
      hostId: 'u102',
      createdAt: 9898989,
      buyer: {
        _id: 'u101',
        fullname: 'User 1',
      },
      totalPrice: 160,
      startDate: '2025/10/15',
      endDate: '2025/10/17',
      guests: {
        adults: 2,
        kids: 1,
      },
      stay: {
        _id: 'h102',
        name: 'House Of Uncle My',
        price: 80.0,
      },
      status: 'pending',
    });
    storageService.postMany(ORDERS_KEY, orders);
  }
  return orders;
}

// function _createOrder(vendor, maxSpeed = 250) {
//   const order = {
//     id: utilService.makeId(),
//     vendor,
//     maxSpeed,
//   };
//   return order;
// }
