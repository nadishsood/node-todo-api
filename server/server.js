//library imports
var express = require('express');
var bodyParser = require('body-parser');//takes JSON and converts to object
var {ObjectID} = require('mongodb');

//local imports
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000

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
                            //whatever we send in the response is the body
  }, (e)=>{
    res.status(404).send(e);
  })
});

app.get('/todos/:id', (req, res)=>{
  let id = req.params.id;

  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }

  else{
    Todo.findById(id).then((todo)=>{
      if(!todo){
        res.status(404).send();
      }
      res.send({todo});
    }, (e)=>{
      res.status(400).send();
    });
  }
});

app.delete('/todos/:id', (req, res)=>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }else{
    Todo.findByIdAndRemove(id).then((todo)=>{
      if(!todo){
        res.status(404).send();
      }else{
        res.send({todo});
      }
    }, (e)=>{
      res.status(400).send();
    });
  }
});

app.listen(port, ()=>{
  console.log(`Started up at port: ${port}`);
});

module.exports = {app}
