const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3354;
const request = require('request');

var employees = [{
  id: 123,
  payRate: '$40',
  clientBillRate: '$45',
  job: 'Software Engineer',
  name: 'Harry Potter'
}];

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing

// View engine setup
app.set('views', path.resolve(path.join(__dirname, 'dist')));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Static files
app.use(express.static(path.resolve(path.join(__dirname, 'dist'))));
app.get('/', (req, res) => {
  res.render('adp.html', {
    employees: employees
  });
});
app.get('/api/employees', (req, res) => {
  res.send({
    total: employees.length,
    data: employees
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.post('/updateADP', (req, res) => {
  console.log('body', req.body);
  if (req.body &&
    req.body.candidateID &&
    req.body.placementID &&
    (req.body.payRate || req.body.clientBillRate)) {
    saveToPayRoll(req.body);
  }
  res.send('Success!');
});

function saveToPayRoll(placementInfo) {
  let id = placementInfo.candidateID;
  let employee = {
    id: placementInfo.candidateID,
    job: placementInfo.job,
    name: placementInfo.candidateName,
    payRate: `$${placementInfo.payRate}`,
    clientBillRate: `$${placementInfo.clientBillRate}`,
  };
  let idx = employees.findIndex(item => item.id === id);
  if (idx >= 0) {
    employees[idx] = employee;
  } else {
    employees.push(employee);
  }
}
