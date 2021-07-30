// server.js

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});


console.log("replit is working. Amazed!") /* FCC really wants this done on 
replit, which is surprisingly unreliable. */

app.get("/api/:date", function(req, res) { /* handle the incoming 
date request */
  let response = stamper(req.params.date);

  console.log(
    "input:", req.params, 
    "response:", response
  );

  res.send(response)

})

app.get("/api/", function(req, res) { /* fulfill the "if no date was attached
return the current date" scenario */
  res.send ({ "unix": new Date().getTime(), "utc": new Date().toUTCString() });
})

function stamper(incoming) { /* sort and convert incoming date requests */
  let outgoing;
  let dateTest = new Date(incoming);
  let unixTest = new Date(parseInt(incoming));
  if (dateTest != "Invalid Date") {
    outgoing = { "unix": dateTest.getTime(), "utc": dateTest.toUTCString() };
  } else if (dateTest == "Invalid Date" && /\d{13}/.test(unixTest.getTime())) {
    outgoing = { "unix": unixTest.getTime(), "utc": unixTest.toUTCString() };
  } else {
  outgoing = { error: "Invalid Date" };
}


return outgoing;
}


/* test dates are as follows:
{ date: '2016-12-25' }
{ date: '2016-12-25' }
{ date: '1451001600000' }
{ date: '05 October 2011' }
{ date: 'this-is-not-a-date' }
*/
