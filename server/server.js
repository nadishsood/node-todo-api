//library imports
var express = require('express');
var bodyParser = require('body-parser');//takes JSON and converts to object
//local imports
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user')

var app = express();

app.use(bodyParser.json());//middleware

app.post('/todos', (req, res) =>{

  var todo = new Todo({
    text: req.body.text
  })


  todo.save().then((doc)=>{
    res.send(doc);

  }, (e)=>{
    res.status(400).send(e);
  })

});

app.get('/todos', (req, res) =>{
  Todo.find().then((todos)=>{
    res.send({todos}) //we're passing the todos array as a property called todos in an object
  }, (e)=>{
    res.status(400).send(e);
  })
})

app.listen(3000, ()=>{
  console.log('Started on port 3000');
});

module.exports = {app}
