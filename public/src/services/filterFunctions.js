//TODO add orders:[{startDate, endDate}] to the spaces collection

export const filterService = {
  getSpacesForDisplay,

}

var filterBy = {
  amenity: "",
  amenities: [],
  location: "",
  numGuests: 0,
  dates: { startDate: 0, endDate: 0 },
  count: Infinity //change this to PAGE_SIZE when add pagination
};

function _isAvailable(space, dates) {
  let orders = orderService.query()
  return orders.every(order => {
    return order.space._id !== space._id ||
      dates.startDate >= order.startDate && dates.endDate <= order.endDate
  })
}

function _getAverageReview(space) {
  const reviewSum = space.reviews.reduce((sum, review) => {
    return sum + _getReviewRate(review)
  },0)
  return reviewSum / space.reviews.length

}

function _getReviewRate(review) {
  const rates = review.rate;
  const totalRates = Object.values(rates).reduce((sum, rate) => sum + rate)
  return totalRates / Object.values(rates).length // or '/ 6'
}

function getSpacesForDisplay(spaces, filterBy) {
  
  //filter space
  spaces = spaces.filter(space => {
    // return (filterBy.amenity === 'all' || space.amenities.includes(filterBy.amenity))
      // && filterBy.amenities.foreach(amenity => space.amenities.includes(amenity))
      // && _isAvailable(space, filterBy.dates)

      //TODO try using google api to search by location
      return (filterBy.type === 'all' || space.type === filterBy.type)
      && ((space.loc.address.toLowerCase().includes(filterBy.location.toLowerCase()) || space.loc.countryCode.toLowerCase().includes(filterBy.location.toLowerCase()) || space.loc.country.toLowerCase().includes(filterBy.location.toLowerCase())) 
      && space.capacity >= Number(filterBy.numGuests))
    })
    //sort by reviews
    // spaces = spaces.sort((space1, space2) => {
    // debugger;
    // return _getAverageReview(space1) - _getAverageReview(space2)
  // })

  //slice out the amount you want - THIS WILL HAPPEN IN FRONT END so fewer server calls
  if (filterBy.count !== Infinity) spaces = spaces.slice(0, filterBy.count)

    return spaces
  const spacesForDisplay = spaces
  return spacesForDisplay;
}

var rate = {
  "cleanliness": 2,
  "checkin": 3,
  "communication": 3,
  "accuracy": 1,
  "value": 5,
  "location": 3
}


