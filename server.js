// basic server file
var express = require("express");

//body parser module
var bodyParser = require("body-parser");

//underscore module
var _ = require("underscore");
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
app.post('/todos', function(req, res) {
  var body = req.body;
  //check for only two data fields provided
  var filteredObj = _.pick(body, "description", "completed");
  // check for validations for todoNextId
  if (!filteredObj || body.description.trim().length === 0 || !_.isBoolean(body.completed) || !_.isString(body.description)) {
    return res.status(400).send("Invalid data submitted");
  }
  // trim body description
  body.description = body.description.trim();
  body.id = todoNextId;
  todos.push(body);
  todoNextId++;
  res.json("post data pushed");
});

// below method is for deleting any record
app.delete("/todos/:id", function(req, res) {
  var todoId = parseInt(req.params.id,10);
  var matchedTodo = _.findWhere(todos,{id:todoId});
  if (matchedTodo) {
    //delete record from array
    todos = _.without(todos,matchedTodo);
    res.send("Task deleted for ID :" + todoId);
  } else {
    res.status(404).send("This record does not exits");
  }
});


// different request for todos task listen
// search query parameters
app.get('/todos', function(req, res) {
  // return json data to request

// filter the request bsaed upon query params
var queryParams = req.query;
var filteredtodos = todos;

if (queryParams.hasOwnProperty("completed") && queryParams.completed === "true")
{
  filteredtodos = _.where(todos,{completed:true});
}
else if ( queryParams.hasOwnProperty("completed") && queryParams.completed === "false" )
{
  filteredtodos = _.where(todos,{completed:false});

}
else if (queryParams.hasOwnProperty("completed")) {
  return res.status(400).send("wrong params to be updated");
}
if ( queryParams.hasOwnProperty("q") && queryParams.q.trim().length > 0)
{
  filteredtodos = _.filter(filteredtodos, function(todo){
    return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1 ;
  });
}

  res.json(filteredtodos);
});


// delete request
app.delete("/todos/:id", function(req, res) {
  var todoId = parseInt(req.params.id, 10);
  //res.send("You are asking for Item : " + todoId );
  var obj = _.findWhere(todos, {
    id: todoId
  })

  if (obj) {
    todos = _.without(todos, obj);

    res.send("record removed for id :" + todoId);
  } else {
    res.status(404).json({
      "error": "such record not exist"
    })
  }

});

//update request  PUT
app.put("/todos/:id", function(req, res) {
  var todoId = parseInt(req.params.id, 10);
  var obj = _.findWhere(todos, {
    id: todoId
  });
  if (obj) {
    var validAttributes = {}

    //check for only two data fields provided
    var body = _.pick(req.body, "description", "completed");
    if (body.hasOwnProperty("completed") && _.isBoolean(body.completed)) {
      validAttributes.completed = body.completed;
    } else if (body.hasOwnProperty("completed")) return res.status(400).send("data not in correct format")
    if (body.hasOwnProperty("description") && _isString(body.description) && body.description.trim().length > 0) {
      validAttributes.description = body.description;

    } else if (body.hasOwnProperty("description")) return res.status(400).send("data not in correct format");
    // here valid attributes are there
    _.extend(obj, validAttributes);
    res.send("updated record");
  } else {
    return res.status(404).json({
      "error": "record does not exist"
    });
  }


});



// GET todos/:id
app.get("/todos/:id", function(req, res) {
  var todoId = parseInt(req.params.id, 10);
  //res.send("You are asking for Item : " + todoId );
  var obj = _.findWhere(todos, {
    id: todoId
  })
  if (obj) {
    res.json(obj);
  } else {
    res.status(404).send("to do task with given ID not found")
  }
  /*var flag  = 0;
  for(var i = 0;i<todos.length;i++)
  {
    var obj = todos[i];
    if (obj.id === todoId) { res.json(obj);flag=1}
  };
   if (!flag) res.status(404).send("to do task not found"); //s end 404 is not in list
   */
})

app.get('/', function(req, res) {
  res.send("This is TO DO App  ROOT");
});

app.listen(PORT, function() {
  console.log("node server started on port :" + PORT);
})
