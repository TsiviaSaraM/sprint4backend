const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const spaceService = require('../space/space.service');
const filterService = require('../../services/filterService');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  query,
  getById,
  getBySpacename,
  remove,
  update,
  add,
//   getSpaceByHost,
  // addMsg,
};

async function query(filterBy = {}) {
  const criteria = _buildCriteria(filterBy);
  try {
    const collection = await dbService.getCollection('space');
    var spaces = await collection.find(criteria).toArray();
    spaces = spaces.sort((space1, space2) => {
      return (
        getAverageReview(space2) -
        getAverageReview(space1)
      );
    });

    // TODO can remove this later - this is for testing with postman
    spaces = spaces.map(space => { 
      return space;
    var news = {}
    // news.capacity = space.capacity;
    // news.type = space.type;
    // news.loc={}
    // news.loc.country = space.loc.country
    // news.loc.address = space.loc.address
    // news._id = space._id
    news.host = space.host._id
    // news.reviewRate = getAverageReview(space)
    // news.reviews = space.reviews.map(review => review.rate)
    // space.description = 'describe'
    // space.imgUrls = [],
    // space.amenities = {}
    // space.likedByUserIds = {}
    // space.host = {}
    news.name = space.name
        return news
    })
    return spaces;
  } catch (err) {
    logger.error('cannot find spaces', err);
    throw err;
  }
}

async function getById(spaceId) {
  try {
    const collection = await dbService.getCollection('space');
    const space = await collection.findOne({ _id: ObjectId(spaceId) });
    return space;
  } catch (err) {
    logger.error(`while finding space ${spaceId}`, err);
    throw err;
  }
}
async function getBySpacename(spacename) {
  try {
    const collection = await dbService.getCollection('space');
    const space = await collection.findOne({ spacename });
    return space;
  } catch (err) {
    logger.error(`while finding space ${spacename}`, err);
    throw err;
  }
}

async function remove(spaceId) {
  try {
    const collection = await dbService.getCollection('space');
    await collection.deleteOne({ _id: ObjectId(spaceId) });
    
  } catch (err) {
    logger.error(`cannot remove space ${spaceId}`, err);
    throw err;
  }
}

async function update(space) {
  // console.log('updating space in service**********', space);
  try {
    // peek only updatable fields!
    let spaceToSave = {
      // _id: ObjectId(space._id),
      name: space.name,
      price: space.price,
      type: space.type,
      createdAt: space.createdAt,
      msgs: space.msgs || [],
    };
    const collection = await dbService.getCollection('space');
    await collection.updateOne(
      { _id: ObjectId(space._id) },
      { $set: { ...spaceToSave } }
    );
    // console.log('spaceToSave updated in service**********', space);
    return space;
  } catch (err) {
    logger.error(`cannot update space ${space._id}`, err);
    throw err;
  }
}

async function add(space) {
  console.log(space);
  try {
    // peek only updatable fields!
    const spaceToAdd = {
      type: space.type,
      name: space.name,
      imgUrls: space.imgUrls,
      price: space.price,
      description: space.description,
      capacity: space.capacity,
      amenities: space.amenities,
      reviews: space.reviews || [],
      host: {
        _id: space.host._id,
        // _id: ObjectId(space.host._id),
        fullname: space.host.fullname,
        imgUrl: space.host.imgURL,
      },
      loc: {
        country: space.loc.country,
        countryCode: space.loc.country,
        address: space.loc.address,
        lat: space.loc.lat,
        lng: space.loc.lng,
      },
      spaces: space.spaces,
      likedByUserIds: space.likedByUserIds || [],
    };
    const collection = await dbService.getCollection('space');
    await collection.insertOne(spaceToAdd);
    return spaceToAdd;
  } catch (err) {
    logger.error('cannot insert space', err);
    throw err;
  }
}

// function _buildCriteria(filterBy) {
//   const criteria = {};
//   if (filterBy.txt) {
//     const txtCriteria = { $regex: filterBy.txt, $options: 'i' };
//     criteria.$or = [
//       {
//         spacename: txtCriteria,
//       },
//       {
//         fullname: txtCriteria,
//       },
//     ];
//   }
//   if (filterBy.minBalance) {
//     criteria.balance = { $gte: filterBy.minBalance };
//   }
//   return criteria;
// }

// async function addMsg(spaceId, msg){
//     try {
//         let space = await getById(spaceId)
//         space.msgs.push(msg)
//         space = await update(space)
//         return space
//     } catch (err) {
//         logger.error('cannot addMsg in space.service', err)
//         throw err
//     }

// }

function _buildCriteria(filterBy) {
  // filterBy.location = '';
  // filterBy.type='';
  // filterBy.capacity = 0;
  // filterBy.country = ''
  // filterBy.numGuests = "8";
//   filterBy.hostId = 'u101'

  let criteria = {};
    if (filterBy.hostId){
        criteria['host._id'] = filterBy.hostId
    }

  if (filterBy.type && filterBy.type !== 'all') {
    criteria.type = filterBy.type;
  }
  if (filterBy.numGuests) {
    //    criteria.capacity = { $gte: filterBy.numGuests }
    const capacity = parseInt(filterBy.numGuests, 10);
    criteria.capacity = { $gte: capacity };
  }

  if (filterBy.country) {
    criteria['loc.country'] = { $regex: filterBy.country, $options: 'i' };
  }

  if (filterBy.location) {
    const orCriteria1 = {
      'loc.address': { $regex: filterBy.location, $options: 'i' },
    };
    const orCriteria2 = {
      'loc.country': { $regex: filterBy.location, $options: 'i' },
    };
    criteria.$or = [orCriteria1, orCriteria2];
  }
  // return { capacity: { '$gte': 0 } }
  return criteria;
}


//TODO move these to filterService
function getAverageReview(space) {
  if (!space.reviews || !space.reviews.length) return 0
  const reviewSum = space.reviews.reduce((sum, review) => {
    return sum + _getReviewRate(review)
  },0)
  return reviewSum / space.reviews.length
  
}

function _getReviewRate(review) {
  if (!Object.keys(review.rate) || !Object.keys(review.rate).length) return 0
  const rates = review.rate;
  const totalRates = Object.values(rates).reduce((sum, rate) => sum + rate)
  return totalRates / Object.values(rates).length // or '/ 6'
}
