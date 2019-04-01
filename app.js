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

app.get('/addarray', (req, res) => {
  let numbers = []
  let sum = 0;
  if(req.query.numbers) {
    numbers = req.query.numbers.split(",").map(Number);
    
    for (var i = 0; i < numbers.length; i++) {
      sum += numbers[i]
    }
  }
  res.send({ "sum": sum }); 
});

app.get('/sum', (req, res) => {
  let a = parseInt(req.query.a);
  let b = parseInt(req.query.b);
  let sum = 0;
  
  if(!a) {
    return res.status(400).send('Please provide the "a" variable');
  }

  if(!b) {
    return res.status(400).send('Please provide the "b" variable');
  }

  const derp = `Sum: ${a + b}`;

  res.send(derp); 
});

app.get('/cipher', (req, res) => {
  let text = req.query.text;
  let shift = parseInt(req.query.shift);
  let convert = '';
  if(!text) {
    return res.status(400).send('Please provide the "text" variable');
  }

  if(!shift) {
    return res.status(400).send('Please provide the "shift" variable');
  }

  for (let i = 0; i < text.length; i++) {
    convert += String.fromCharCode(text[i].charCodeAt(0) + shift);
  }

  const responseText = `Text: ${text}; Shift: ${shift}; Convert: ${convert}`;
  res.send(responseText);
});

app.get('/lotto', (req, res) => {
  let arr = req.query.arr;

  if(!arr) {
    return res.status(400).send('Please provide the "arr" variable. Example: "?arr=1&arr=2..." with a total of 6 values');
  }

  if(arr.length > 6 || arr.length < 6 || arr.lenth < 0) {
    return res.status(400).send('Please provide only a total of 6 values for the "arr" variable.');
  }
  console.log(arr.length);
  res.send(arr);
});