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
StoreLocation.prototype.calcCookiesPurchasedPerDay = function() {
  for (let i = 0; i < storeHours.length; i++) {
    let cookiesEachHour = Math.ceil(this.avgCookiePerCustomer * randNumCustomers(this.minCustomerEachHour, this.maxCustomerEachHour));
    this.cookiesPurchasedEachHour.push(cookiesEachHour);
    this.totalCookiesPerDay += cookiesEachHour;
  }
};

// Method to render table row for store
StoreLocation.prototype.renderRow = function(table) {
  let row = document.createElement('tr');
  appendNewElement(this.storeName, 'th', row);
  this.cookiesPurchasedEachHour.forEach(function(count) {
    appendNewElement(count, 'td', row);
  });
  appendNewElement(this.totalCookiesPerDay, 'td', row);
  table.appendChild(row);
};

// Helper function to get random number of customers
function randNumCustomers(minCustomers, maxCustomers) {
  return Math.floor(Math.random() * (maxCustomers - minCustomers + 1)) + minCustomers;
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
  row.setAttribute('id', 'tableHeader');
  appendNewElement('Location', 'th', row);
  storeHours.forEach(function(item) {
    appendNewElement(item, 'th', row);
  });
  appendNewElement('Daily Location Total', 'th', row);
  table.appendChild(row);
}

// Function to calculate and render hourly total row
function renderHourlyTotals(table) {
  let row = document.createElement('tr');
  appendNewElement('Totals', 'th', row);
  let total = 0;
  for (let i = 0; i < storeHours.length; i++) {
    let subTotal = 0;
    allStores.forEach(function(store) {
      subTotal += store.cookiesPurchasedEachHour[i];
    });
    appendNewElement(subTotal, 'td', row);
    total += subTotal;
  }
  appendNewElement(total, 'td', row);
  table.appendChild(row);
}

// Helper function to create and append new element into parent
function appendNewElement(content, tag, parentElement) {
  let newElement = document.createElement(tag);
  newElement.textContent = content;
  parentElement.appendChild(newElement);
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


//
// Initialize Values, Instantiate Stores, and Render Table
//
let storeSpecs = [
  ['1st and Pike', 23, 65, 6.3],
  ['SeaTac Airport', 3, 24, 1.2],
  ['Seattle Center', 11, 38, 3.7],
  ['Capital Hill', 20, 38, 2.3],
  ['Alki', 2, 16, 4.6],
];
let storeHours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
let allStores = makeStores();
renderDailySalesTable();
