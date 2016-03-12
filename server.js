// basic server file
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

//create collection of models for data purpose
var todos = [{
  id: 1,
  description: "Go for haircut",
  completed: false
}, {
  id: 2,
  description: "wash scooty",
  completed: false
}, {
  id: 3,
  description: "Go to gym",
  completed: true
}];

// different request for todos task listen
// GET todos/
app.get('/todos', function(req, res) {
  // return json data to request
  res.json(todos);
})

// GET todos/:id
app.get("/todos/:id",function(req,res) {
  var todoId = parseInt(req.params.id,10);
  //res.send("You are asking for Item : " + todoId );
  var flag  = 0;
  for(var i = 0;i<todos.length;i++)
  {
    var obj = todos[i];
    if (obj.id === todoId) { res.json(obj);flag=1}
  };
   if (!flag) res.status(404).send("to do task not found"); //s end 404 is not in list
})

app.get('/', function(req, res) {
  res.send("This is TO DO App  ROOT");
});

app.listen(PORT, function() {
  console.log("node server started on port :" + PORT);
})
