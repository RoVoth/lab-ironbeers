const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index.hbs');
});
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersApi => {
      res.render('beers.hbs', {
        beersApi
      });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(resFromApi => {
      res.render('random-beer', { beers: resFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/beers/:beerId', (req, res) => {
  punkAPI
    .getBeer(req.params.beerId)
    .then(resFromApi => {
      res.render('beer-info.hbs', { beers: resFromApi });
    })
    .catch(err => console.log(err));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
