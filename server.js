const express = require('express'); 

const app = express(); 
app.use(express.json());

const mysql = require('mysql2');

var cors = require('cors');
app.use(cors());

const port = process.env.PORT || 5000; 

var state= 'OFF';

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n_9992',
    database: 'ESP',
});

// Connect to mysql
db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...'); 
});


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 



// create a GET route
app.get('/temp', (req, res) => { 

  let sql = "SELECT * FROM temperature";
  
  db.query(sql, (err, results) => {
    if (err) throw err;
    var Temp_Values=[]
    for(let i=0 ; i < results.length ; i++)
    {
      Temp_Values[i]=(results[i].temperature);
    }
    res.send(Temp_Values); });
}); 

// Get the pressure values
app.get('/pres', (req, res) => {
  let sql = 'SELECT * FROM pressure;';
  db.query(sql, (err, results) => {
      if (err) throw err;
      var pressure_Values=[]
      for(let i=0 ; i < results.length ; i++)
      {
        pressure_Values[i]=(results[i].pressure);
      }
      res.send(pressure_Values); });
  }); 
  

// Add a temperature value
app.post('/temp', (req, res) => {
  const temp = req.body.temperature;
  if (typeof temp !== 'number') {
      return res.send('please enter a valid number').status(400);
  }
  let sql = `INSERT INTO temperature (temperature) VALUES ('${temp}');`;
  db.query(sql, (err, results) => {
      if (err) throw err;
      // console.log(results);
      res.send(`added new record of value: ${temp}`);
  });
});

// Add a pressure value
app.post('/pres', (req, res) => {
  const pressure = req.body.pressure;
  if (typeof pressure !== 'number') {
      return res.send('please enter a valid number').status(400);
  }
  let sql = `INSERT INTO pressure (pressure) VALUES ('${pressure}');`;
  db.query(sql, (err, results) => {
      if (err) throw err;
      // console.log(results);
      res.send(`added new record of value: ${pressure}`);
  });
});

// Firing ALarm /LED permission
app.post('/TrunLed', (req, res) => {
  const LEdState = req.body.status;
  if (LEdState == 'ON') {
    state = 'ON' ;
  }
  else{
    state = 'OFF';
  }
  console.log(state);
  return res.send(`LED STATUS IS ${state}`); 
});
  
app.get('/LEDSTATE', (req, res) => {

  console.log(state) 
  res.send(state);
});