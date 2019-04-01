'use-strict';

const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.listen(8000, () => {
  console.log('Express server is listening on port 8000');
})

app.get('/', (req, res) => {
  res.send('Hello Express');
})

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
  `;
  res.send(responseText);
});

app.get('/queryviewer', (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});

app.get('/add', (req, res) => {
  let numbers = []
  let sum = 0;
  if(req.query.numbers) {
    numbers = req.query.numbers.split(",").map(Number);
    
    for (var i = 0; i < numbers.length; i++) {
      sum += numbers[i]
    }
  }
  res.send(` sum: ${sum} `); 
});