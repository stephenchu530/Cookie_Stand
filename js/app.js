'use strict';

// Get store form node
var storeForm = document.getElementById('store-form');

// Initial Stores
let initialStores = [
  ['1st and Pike', 23, 65, 6.3],
  ['SeaTac Airport', 3, 24, 1.2],
  ['Seattle Center', 11, 38, 3.7],
  ['Capital Hill', 20, 38, 2.3],
  ['Alki', 2, 16, 4.6],
];

// Store hours
let storeHours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];

// All stores array
let allStores = [];

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

// Function to render daily sales table
function renderDailySalesTable() {
  let sectionEl = document.getElementById('dailySales');
  sectionEl.textContent = '';
  appendNewElement('Daily Sales Projection', 'h2', sectionEl);
  let table = document.createElement('table');
  renderTableHeader(table);
  renderTableBody(table);
  renderTableFooter(table);
  sectionEl.appendChild(table);
}

// Function to render table header
function renderTableHeader(table) {
  let tHead = document.createElement('thead');
  let row = document.createElement('tr');
  row.setAttribute('id', 'tableHeader');
  appendNewElement('Location', 'th', row);
  storeHours.forEach(function(item) {
    appendNewElement(item, 'th', row);
  });
  appendNewElement('Daily Location Total', 'th', row);
  tHead.appendChild(row);
  table.appendChild(tHead);
}

// Function to render the table body
function renderTableBody(table) {
  let tBody = document.createElement('tbody');
  allStores.forEach(function(store) {
    store.renderRow(tBody);
  });
  table.appendChild(tBody);
}

// Function to calculate and render table footer
function renderTableFooter(table) {
  let tFoot = document.createElement('tfoot');
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
  tFoot.appendChild(row);
  table.appendChild(tFoot);
}

// Helper function to create and append new element into parent
function appendNewElement(content, tag, parentElement) {
  let newElement = document.createElement(tag);
  newElement.textContent = content;
  parentElement.appendChild(newElement);
}

// Helper function to get random number of customers
function randNumCustomers(minCustomers, maxCustomers) {
  return Math.floor(Math.random() * (maxCustomers - minCustomers + 1)) + minCustomers;
}

// Event handler for adding or updating stores
function handleAddUpdateSubmit(e) {
  e.preventDefault();

  let storeName = e.target.storeName.value;
  let minCustomerEachHour = parseInt(e.target.minCustomerEachHour.value);
  let maxCustomerEachHour = parseInt(e.target.maxCustomerEachHour.value);
  let avgCookiePerCustomer = parseFloat(e.target.avgCookiePerCustomer.value);

  if (maxCustomerEachHour < minCustomerEachHour) {
    return alert('Minimum Customers/Hour needs to be less than or equal to Maximum Customers/Hour!');
  }

  for (let i = 0; i < allStores.length; i++) {
    if (storeName.toLowerCase() === allStores[i].storeName.toLowerCase()) {
      allStores[i].minCustomerEachHour = minCustomerEachHour;
      allStores[i].maxCustomerEachHour = maxCustomerEachHour;
      allStores[i].avgCookiePerCustomer = avgCookiePerCustomer;
      allStores[i].cookiesPurchasedEachHour = [];
      allStores[i].totalCookiesPerDay = 0;
      allStores[i].calcCookiesPurchasedPerDay();
      storeName = null;
      break;
    }
  }

  if (storeName) {
    let newStore = new StoreLocation(storeName, minCustomerEachHour, maxCustomerEachHour, avgCookiePerCustomer);
    newStore.calcCookiesPurchasedPerDay();
    allStores.push(newStore);
  }

  e.target.storeName.value = null;
  e.target.minCustomerEachHour.value = null;
  e.target.maxCustomerEachHour.value = null;
  e.target.avgCookiePerCustomer.value = null;

  renderDailySalesTable();
}

// Function to instantiate store locations
function makeStores() {
  let stores = [];
  initialStores.forEach(function(store) {
    let newStore = new StoreLocation(store[0], store[1], store[2], store[3]);
    newStore.calcCookiesPurchasedPerDay();
    stores.push(newStore);
  });
  return stores;
}

// Only load if on Sales Page
if (storeForm) {
  // Event listener for store submission form
  storeForm.addEventListener('submit', handleAddUpdateSubmit);

  // Initialize Starting Stores
  allStores = makeStores();

  // Render the Daily Sales Table
  renderDailySalesTable();
}
