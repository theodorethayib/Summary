const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();

var objContr = "-36.0";
var Br40d = "";
var CNN = "";
var Br40d3 = "";
var Blend_07FBP_03CNN = "";
var Br40d5 = "";
var Blend_05FBP_05CNN = "";

var dbstring = "";

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));



app.listen(3000, () => console.log('listening at 3000'));


// dbstring = 'SELECT * FROM object_summary WHERE object_contrast = -36.0';

let db = new sqlite3.Database('./database/summary.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the summary SQlite database.');
});

db.serialize(() => {
  db.each(`SELECT id as id,
                  object_contrast as name
           FROM object_summary`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.name);
  });
});



app.get('/api', (request, response) => {
  let db = new sqlite3.Database('./database/summary.db', sqlite3.OPEN_READONLY);

  dbstring = 'SELECT * FROM object_summary WHERE object_contrast = ' + objContr;
  // dbstring = 'SELECT ' + Br40d + CNN + Br40d3 + Blend_07FBP_03CNN + Br40d5 + Blend_05FBP_05CNN + 'id FROM object_summary WHERE object_contrast = ' + objContr;

  db.serialize(() => {
    // db.all('SELECT * FROM object_summary', function(err, data) {
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
  // console.log(request.body)

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

    case JSON.stringify({ Br40d: true}):
      Br40d = "dp_B4r0d, ";
      console.log("Br40d: " + Br40d);
      break;

    case JSON.stringify({ Br40d: false}):
      Br40d = "";
      console.log("Br40d: " + Br40d);
      break;

    case JSON.stringify({ CNN: true}):
      CNN = "dp_CNN, ";
      console.log("CNN: " + CNN);
      break;

    case JSON.stringify({ CNN: false}):
      CNN = "";
      console.log("CNN: " + CNN);
      break;

    case JSON.stringify({ Br40d3: true}):
      Br40d3 = "dp_Br40d3, ";
      console.log("Br40d3: " + Br40d3);
      break;

    case JSON.stringify({ Br40d3: false}):
      Br40d3 = "";
      console.log("Br40d3: " + Br40d3);
      break;

    case JSON.stringify({ Blend07FPB03CNN: true}):
      Blend_07FBP_03CNN = "dp_Blend_07FBP_03CNN, ";
      console.log("Blend_07FBP_03CNN: " + Blend_07FBP_03CNN);
      break;

    case JSON.stringify({ Blend07FPB03CNN: false}):
      Blend_07FBP_03CNN = "";
      console.log("Blend_07FBP_03CNN: " + Blend_07FBP_03CNN);
      break;

    case JSON.stringify({ Br40d5: true}):
      Br40d5 = "dp_Br40d5, ";
      console.log("Br40d5: " + Br40d5);
      break;

    case JSON.stringify({ Br40d5: false}):
      Br40d5 = "";
      console.log("Br40d5: " + Br40d5);
      break;

    case JSON.stringify({ Blend05FBP05CNN: true}):
      Blend_05FBP_05CNN = "dp_Blend_05FBP_05CNN, ";
      console.log("Blend_05FBP_05CNN: " + Blend_05FBP_05CNN);
      break;

    case JSON.stringify({ Blend05FBP05CNN: false}):
      Blend_05FBP_05CNN = "";
      console.log("Blend_05FBP_05CNN: " + Blend_05FBP_05CNN);
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