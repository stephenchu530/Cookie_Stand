'use strict';

let hours = 15;

let firstAndPike = {
  name: '1st and Pike',
  minCustomer: 23,
  maxCustomer: 65,
  avgCookiePerCustomer: 6.3,
  randNumCustomer: function () {
    return Math.floor(Math.random() * (this.maxCustomer - this.minCustomer + 1)) + this.minCustomer;
  },
  cookiesPurchased: [],
  calcCookiesPurch: function () {
    for (let i = 0; i < hours; i++) {
      this.cookiesPurchased.push(Math.floor(this.avgCookiePerCustomer * this.randNumCustomer()));
    }
  },
  total: 0,
  calcTotal: function () {
    for (let i = 0; i < this.cookiesPurchased.length; i++) {
      this.total += this.cookiesPurchased[i];
    }
  }
};

let seaTacAirport = {
  name: 'SeaTac Airport',
  minCustomer: 3,
  maxCustomer: 24,
  avgCookiePerCustomer: 1.2,
  randNumCustomer: function () {
    return Math.floor(Math.random() * (this.maxCustomer - this.minCustomer + 1)) + this.minCustomer;
  },
  cookiesPurchased: [],
  calcCookiesPurch: function () {
    for (let i = 0; i < hours; i++) {
      this.cookiesPurchased.push(Math.floor(this.avgCookiePerCustomer * this.randNumCustomer()));
    }
  },
  total: 0,
  calcTotal: function () {
    for (let i = 0; i < this.cookiesPurchased.length; i++) {
      this.total += this.cookiesPurchased[i];
    }
  }
};

let seattleCenter = {
  name: 'Seattle Center',
  minCustomer: 11,
  maxCustomer: 38,
  avgCookiePerCustomer: 3.7,
  randNumCustomer: function () {
    return Math.floor(Math.random() * (this.maxCustomer - this.minCustomer + 1)) + this.minCustomer;
  },
  cookiesPurchased: [],
  calcCookiesPurch: function () {
    for (let i = 0; i < hours; i++) {
      this.cookiesPurchased.push(Math.floor(this.avgCookiePerCustomer * this.randNumCustomer()));
    }
  },
  total: 0,
  calcTotal: function () {
    for (let i = 0; i < this.cookiesPurchased.length; i++) {
      this.total += this.cookiesPurchased[i];
    }
  }
};

let capitolHill = {
  name: 'Capitol Hill',
  minCustomer: 20,
  maxCustomer: 38,
  avgCookiePerCustomer: 2.3,
  randNumCustomer: function () {
    return Math.floor(Math.random() * (this.maxCustomer - this.minCustomer + 1)) + this.minCustomer;
  },
  cookiesPurchased: [],
  calcCookiesPurch: function () {
    for (let i = 0; i < hours; i++) {
      this.cookiesPurchased.push(Math.floor(this.avgCookiePerCustomer * this.randNumCustomer()));
    }
  },
  total: 0,
  calcTotal: function () {
    for (let i = 0; i < this.cookiesPurchased.length; i++) {
      this.total += this.cookiesPurchased[i];
    }
  }
};

let alki = {
  name: 'Alki',
  minCustomer: 2,
  maxCustomer: 16,
  avgCookiePerCustomer: 4.6,
  randNumCustomer: function () {
    return Math.floor(Math.random() * (this.maxCustomer - this.minCustomer + 1)) + this.minCustomer;
  },
  cookiesPurchased: [],
  calcCookiesPurch: function () {
    for (let i = 0; i < hours; i++) {
      this.cookiesPurchased.push(Math.floor(this.avgCookiePerCustomer * this.randNumCustomer()));
    }
  },
  total: 0,
  calcTotal: function () {
    for (let i = 0; i < this.cookiesPurchased.length; i++) {
      this.total += this.cookiesPurchased[i];
    }
  }
};

let places = [firstAndPike, seaTacAirport, seattleCenter, capitolHill, alki];

places.forEach(function (place) {
  place.calcCookiesPurch();
  place.calcTotal();
});

let sectionEl = document.getElementById('dailySales');
places.forEach(function (place) {
  let pEl = document.createElement('p');
  pEl.textContent = `${place.name}`;
  sectionEl.appendChild(pEl);
  let ulEl = document.createElement('ul');
  for (let i = 0; i < hours; i++) {
    let liEl = document.createElement('li');
    let time = (i < 6) ? 'am' : 'pm';
    let hr = (i < 7) ? i + 6 : i - 6;
    liEl.textContent = `${hr}${time}: ${place.cookiesPurchased[i]} cookies`;
    ulEl.appendChild(liEl);
  }
  let liEl = document.createElement('li');
  liEl.textContent = `Total: ${place.total} cookies`;
  ulEl.appendChild(liEl);
  sectionEl.appendChild(ulEl);
});
