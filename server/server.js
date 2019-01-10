require('./config/config.js');

//library imports
const _ = require('lodash')
const express = require('express');
const bodyParser = require('body-parser');//takes JSON and converts to object
const {ObjectID} = require('mongodb');

//local imports
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;

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

app.patch('/todos/:id', (req, res)=>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new:true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});

//POST /Users

app.post('/users', (req, res)=>{
  let body = _.pick(req.body, ['email', 'password']);


  let user = new User(body);

  user.save().then(()=>{ //.then(user) is also the same thing //scope
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth', token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  })
});

app.listen(port, ()=>{
  console.log(`Started up at port: ${port}`);
});

module.exports = {app}
