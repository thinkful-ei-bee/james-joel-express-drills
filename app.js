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
  let randomArr = [];
  let matchArr = [];
  //arr.map(element => parseInt(element));
  for (let i = 0; i < arr.length; i++) {
    arr[i] = parseInt(arr[i]);
  }
  for (let i = 0; i < 6; i++) {
    // gen random ..
    randomArr[i] = Math.floor(Math.random() * Math.floor(20))
  }

  if(!arr) {
    return res.status(400).send('Please provide the "arr" variable. Example: "?arr=1&arr=2..." with a total of 6 values');
  }

  if(arr.length > 6 || arr.length < 6 || arr.lenth < 0) {
    return res.status(400).send('Please provide only a total of 6 values for the "arr" variable.');
  }

  arr.map(number => {
    if(number > 20 || number < 1) {
      return res.status(400).send('Please provide values of less than or equal to 20.');
    }
  });

  arr.forEach(element1 => randomArr.forEach(element2 => {
      if(element1 === element2) {
        matchArr.push(element1)
      }
    }
  ));
  console.log('passed in arr: ', arr);
  console.log('random arr: ', randomArr);
  console.log('match arr: ', matchArr);
  // if(matchArr.length < 3) {
  //   res.send('Sorry, you lose');
  // }
  if(matchArr.length === 4) {
    res.send('Congratulations, you win a free ticket');
  }
  else if(matchArr.length === 5) {
    res.send('Congratulations! You win $100!');
  }
  else if(matchArr.length === 6) {
    res.send('Wow! Unbelievable! You could have won the mega millions!"');
  }
  else {
    res.send('Sorry, you lose');
  }
  
});