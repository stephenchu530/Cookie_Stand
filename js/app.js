'use strict';

// Store Location Object Constructor
let StoreLocation = function (storeName,
                              minCustomerEachHour,
                              maxCustomerEachHour,
                              avgCookiePerCustomer) {
  this.storeName = storeName;
  this.minCustomerEachHour = minCustomerEachHour;
  this.maxCustomerEachHour = maxCustomerEachHour;
  this.avgCookiePerCustomer = avgCookiePerCustomer;
  this.cookiesPurchasedEachHour = [];
  this.totalCookiesPerDay = 0;
};

// Method to calculate number of cookies purchased per day
StoreLocation.prototype.calcCookiesPurchasedPerDay = function () {
  for (let i = 0; i < storeHours.length; i++) {
    let cookiesEachHour = Math.ceil(
      this.avgCookiePerCustomer * randNumCustomers(
        this.minCustomerEachHour, this.maxCustomerEachHour
      ));
    this.cookiesPurchasedEachHour.push(cookiesEachHour);
    this.totalCookiesPerDay += cookiesEachHour;
  }
}

// Method to render table row for store
StoreLocation.prototype.renderRow = function () {
}

// Helper function to get random number of customers
function randNumCustomers(minCustomers, maxCustomers) {
  return Math.floor(
    Math.random() * (maxCustomers - minCustomers + 1)
  ) + minCustomers;
}

// Function to Instantiate Store Locations
function makeStores() {
  storeSpecs.forEach(function(store) {
    let newStore = new StoreLocation(store[0], store[1], store[2], store[3]);
    newStore.calcCookiesPurchasedPerDay();
    allStores.push(newStore);
  });
}

let storeSpecs = [
  ['1st and Pike', 23, 65, 6.3],
  ['SeaTac Airport', 3, 24, 1.2],
  ['Seattle Center', 11, 38, 3.7],
  ['Capital Hill', 20, 38, 2.3],
  ['Alki', 2, 16, 4.6],
];
let storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
let allStores = [];
makeStores();
