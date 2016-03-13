// basic server file
var express = require("express");

//body parser module
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 3000;

// attach middleware to express module so that it parses everyting we get POST data
app.use(bodyParser.json());

//create collection of models for data purpose
// below data would br craeted by POST method
/*var todos = [{
  id: 1,
  description: "Go for haircut and trimming",
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
*/

var todos = [];
var todoNextId = 1;

// POST method to add data
app.post('/todos',function(req,res){
  var body = req.body;
  console.log("description :" + body.description);
  body.id = todoNextId;
  todos.push(body);
  todoNextId++;
  res.json("post data pushed");
});




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
