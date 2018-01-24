'use strict';

Product.allProducts = [];

Product.totalClicks = 0;

Product.lastDisplayed = [];

var sectionEl = document.getElementById('product-section');

var ulEl = document.getElementById('results');

var names = [];


function Product(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.votes = 0;
  this.timesDisplayed = 0;

  Product.allProducts.push(this);
  names.push(this.name);
}

new Product('img/bag.jpg', 'R2D2 BAG');
new Product('img/banana.jpg', 'Banana Slicer');
new Product('img/bathroom.jpg', 'Toliet Paper Holder');
new Product('img/boots.jpg', 'Boots');
new Product('img/breakfast.jpg', 'Breakfast Maker');
new Product('img/bubblegum.jpg', 'Bubblegum');
new Product('img/chair.jpg', 'Chair');
new Product('img/cthulhu.jpg', 'Cthulu');
new Product('img/dog-duck.jpg', 'Duck Beak for Dog');
new Product('img/dragon.jpg', 'Dragon');
new Product('img/pen.jpg', 'Pen');
new Product('img/pet-sweep.jpg', 'Pet Floor Cleaner');
new Product('img/scissors.jpg', 'Scissors');
new Product('img/shark.jpg', 'Shark');
new Product('img/sweep.png', 'Sweep');
new Product('img/tauntaun.jpg', 'Tauntaun');
new Product('img/unicorn.jpg', 'Unicorn');
new Product('img/usb.gif', 'USB');
new Product('img/water-can.jpg', 'Water-Can');
new Product ('img/wine-glass.jpg','Wine-Glass');

var leftEl = document.getElementById('left');
var centerEl = document.getElementById('center');
var rightEl = document.getElementById('right');


function randomProduct() {
  var randomLeft = Math.round(Math.random() * Product.allProducts.length);
  var randomCenter = Math.round(Math.random() * Product.allProducts.length);
  var randomRight = Math.round(Math.random() * Product.allProducts.length);


  while(randomLeft === randomRight || randomLeft === randomCenter || randomRight === randomCenter || Product.allProducts.includes(randomLeft) || Product.allProducts.includes(randomCenter) || Product.allProducts.includes(randomRight)) {
    console.log('Duplicate was caught');
    randomLeft = Math.round(Math.random() * Product.allProducts.length);
    randomCenter = Math.round(Math.random() * Product.allProducts.length);
    randomRight = Math.round(Math.random() * Product.allProducts.length);
  }

  leftEl.src = Product.allProducts[randomLeft].filepath;
  leftEl.alt = Product.allProducts[randomLeft].name;

  centerEl.src = Product.allProducts[randomCenter].filepath;
  centerEl.alt = Product.allProducts[randomCenter].name;

  rightEl.src = Product.allProducts[randomRight].filepath;
  rightEl.alt = Product.allProducts[randomRight].name;

  Product.allProducts[randomLeft].timesDisplayed += 1;
  Product.allProducts[randomCenter].timesDisplayed += 1;
  Product.allProducts[randomRight].timesDisplayed += 1;

  Product.lastDisplayed = [];
  Product.lastDisplayed.push(randomLeft);
  Product.lastDisplayed.push(randomCenter);
  Product.lastDisplayed.push(randomRight);
}

function handleClick(event){
  Product.totalClicks += 1;
  console.log(event.target.alt);
  for (var i in Product.allProducts) {
    if(event.target.alt === Product.allProducts[i].name) {
      Product.allProducts[i].votes += 1;
    }
    randomProduct();
  }
  if(Product.totalClicks > 25) {
    Product.selectionEl.removeEventListener('click' , handleClick);
  }
}

function results() {
  for (var i in Product.allProducts) {
    var liEl = document.createElement('li');
    liEl.textContent = Product.allProducts[i].name + ' recived ' + Product.allProducts[i].votes + ' votes and was displayed ' + Product.allProducts.timesDisplayed + ' times.';
    ulEl.appendChild(liEl);
  }
}
sectionEl.addEventListener('click', handleClick);

randomProduct();