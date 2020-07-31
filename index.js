const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();

var objContr = "-36.0";
var dbstring = "";

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.listen(3000, () => console.log('listening at 3000'));

let db = new sqlite3.Database('./database/summary.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the summary SQlite database.');
});

app.get('/api', (request, response) => {
  let db = new sqlite3.Database('./database/summary.db', sqlite3.OPEN_READONLY);

  dbstring = 'SELECT * FROM object_summary WHERE object_contrast = ' + objContr + ' ORDER BY object_diamater';

  db.serialize(() => {
      db.all(dbstring, function(err, data) {
      if (err) {
        console.log("ERROR");
        response.end();
        return;
      }
      response.json(data);
    });
  });
})

app.post('/api', (request, response) => {
  console.log("Request body: " + JSON.stringify(request.body));

  switch (JSON.stringify(request.body)) { //On recieving request body
    case JSON.stringify({ object_contrast: -36 }):
      objContr = '-36.0';
      console.log("Object contrast: " + objContr);
      break;

    case JSON.stringify({ object_contrast: -28 }):
      objContr = '-28.0';
      console.log("Object contrast: " + objContr);
      break;

    case JSON.stringify({ object_contrast: -23 }):
      objContr = '-23.0';
      console.log("Object contrast: " + objContr);
      break;

    case JSON.stringify({ object_contrast: -21 }):
      objContr = '-21.0';
      console.log("Object contrast: " + objContr);
      break;

    case JSON.stringify({ object_contrast: -14 }):
      objContr = '-14.0';
      console.log("Object contrast: " + objContr);
      break;

    case JSON.stringify({ object_contrast: -6 }):
      objContr = '-6.0';
      console.log("Object contrast: " + objContr);
      break;
  }

  response.json({
    status:'success'
  });
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});