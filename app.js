'use strict';

Product.allProducts = [];

Product.totalClicks = 0;

Product.lastDisplayed = [];

var sectionEl = document.getElementById('product-section');

var ulEl = document.getElementById('results');

var names = [];

var productVotes = [];

//Constructer function Product
function Product(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.votes = 0;
  this.timesDisplayed = 0;

  Product.allProducts.push(this);
  names.push(this.name);
}
//All Products with paramaters (filepath and name)
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

//Creating access to each image
var leftEl = document.getElementById('left');
var centerEl = document.getElementById('center');
var rightEl = document.getElementById('right');

//Making the images that appear random
function randomProduct() {
  var randomLeft = Math.floor(Math.random() * Product.allProducts.length);
  var randomCenter = Math.floor(Math.random() * Product.allProducts.length);
  var randomRight = Math.floor(Math.random() * Product.allProducts.length);

  //Insuring that the same picture doesn't occur on the page at the same time or repeating after itself
  while(randomLeft === randomRight || randomLeft === randomCenter || randomRight === randomCenter || Product.lastDisplayed.includes(randomLeft) || Product.lastDisplayed.includes(randomCenter) || Product.lastDisplayed.includes(randomRight)) {
    console.log('Duplicate was caught');
    randomLeft = Math.floor(Math.random() * Product.allProducts.length);
    randomCenter = Math.floor(Math.random() * Product.allProducts.length);
    randomRight = Math.floor(Math.random() * Product.allProducts.length);
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
  for (var i in Product.allProducts) {
    if(event.target.alt === Product.allProducts[i].name) {
      Product.allProducts[i].votes += 1;
    }
  }
  if(Product.totalClicks > 25) {
    sectionEl.removeEventListener('click' , handleClick);
    countVotes();
    renderChart();
  } else {
    randomProduct();
  }
}


function countVotes() {
  for(var i in Product.allProducts) {
    productVotes[i] = Product.allProducts[i].votes;
  }
}



function renderChart() {
  var context = document.getElementById('productChart').getContext('2d');

  var chartColors = ['#4289f4','#8f41f4', '#4289f4','#8f41f4', '#4289f4','#8f41f4', '#4289f4','#8f41f4','#4289f4','#8f41f4','#4289f4','#8f41f4','#4289f4','#8f41f4','#4289f4','#8f41f4','#4289f4','#8f41f4','#4289f4','#8f41f4'];

  var productChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: 'Votes Per Product',
        data: productVotes,
        backgroundColors: chartColors,
      }]
    },
    options: {
      scales:{
        yAxes: [{
          ticks:{
            beginAtZero:true
          }
        }]
      }
    }
  });
}


sectionEl.addEventListener('click', handleClick);

randomProduct();


if (window.localStorage) {
  localStorage.clear;
  localStorage.votes = productVotes;
  localStorage.setItem('session', JSON.stringify(countVotes));
  document.getElementById('Votes Per Product');
  localStorage.getItem('results');
}