'use strict';

// Store Location Object Constructor
let StoreLocation = function(storeName, minCustomerEachHour, maxCustomerEachHour, avgCookiePerCustomer) {
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
};

// Method to render table row for store
StoreLocation.prototype.renderRow = function (table) {
  let row = document.createElement('tr');
  let data = document.createElement('th');
  data.textContent = this.storeName;
  row.appendChild(data);
  this.cookiesPurchasedEachHour.forEach(function(count) {
    data = document.createElement('td');
    data.textContent = count;
    row.appendChild(data);
  });
  data = document.createElement('td');
  data.textContent = this.totalCookiesPerDay;
  row.appendChild(data);
  table.appendChild(row);
};

// Helper function to get random number of customers
function randNumCustomers(minCustomers, maxCustomers) {
  return Math.floor(
    Math.random() * (maxCustomers - minCustomers + 1)
  ) + minCustomers;
}

// Function to instantiate store locations
function makeStores() {
  let stores = [];
  storeSpecs.forEach(function(store) {
    let newStore = new StoreLocation(store[0], store[1], store[2], store[3]);
    newStore.calcCookiesPurchasedPerDay();
    stores.push(newStore);
  });
  return stores;
}

// Function to render empty table with header
function renderDailySalesTable() {
  let sectionEl = document.getElementById('dailySales');
  let table = document.createElement('table');
  renderHeader(table);
  allStores.forEach(function(store) {
    store.renderRow(table);
  });
  renderHourlyTotals(table);
  sectionEl.appendChild(table);
}

// Helper function to render table header
function renderHeader(table) {
  let row = document.createElement('tr');
  let header = document.createElement('td');
  row.appendChild(header);
  storeHours.forEach(function(item) {
    header = document.createElement('th');
    header.textContent = item;
    row.appendChild(header);
  });
  header = document.createElement('th');
  header.textContent = 'Daily Location Total';
  row.appendChild(header);
  table.appendChild(row);
}

// Function to calculate and render hourly total row
function renderHourlyTotals(table) {
  let row = document.createElement('tr');
  let data = document.createElement('th');
  data.textContent = 'Totals';
  row.appendChild(data);
  let total = 0;
  for (let i = 0; i < storeHours.length; i++) {
    let subTotal = 0;
    allStores.forEach(function(store) {
      subTotal += store.cookiesPurchasedEachHour[i];
    });
    data = document.createElement('td');
    data.textContent = subTotal;
    row.appendChild(data);
    total += subTotal;
  }
  data = document.createElement('td');
  data.textContent = total;
  row.appendChild(data);
  table.appendChild(row);
}

// Initial Values and Instantiate Stores
let storeSpecs = [
  ['1st and Pike', 23, 65, 6.3],
  ['SeaTac Airport', 3, 24, 1.2],
  ['Seattle Center', 11, 38, 3.7],
  ['Capital Hill', 20, 38, 2.3],
  ['Alki', 2, 16, 4.6],
];
let storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
let allStores = makeStores();
renderDailySalesTable();
