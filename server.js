// basic server file
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;


app.get('/', function(req, res) {
  res.send("This is TO DO App  ROOT");
});

app.listen(PORT, function() {
  console.log("node server started on port :" + PORT);
})
