require('./config/config.js');

//library imports
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');//takes JSON and converts to object
const { ObjectID } = require('mongodb');

//local imports
let { mongoose } = require('./db/mongoose.js');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');
let { authenticate } = require('./middleware/authenticate');

let app = express();
const port = process.env.PORT;

app.use(bodyParser.json());//middleware

app.post('/todos', authenticate, (req, res) => {
  let todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({ todos })             //we're passing the todos array as a property called todos in an object. Whatever we send in the response is the body
  }, (e) => {
    res.status(404).send(e);
  })
});


app.get('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  else {
    // Todo.findById(id).then((todo) => {
    //   if (!todo) {
    //     return res.status(404).send();
    //   }

    Todo.findOne({
      _id: id,
      _creator: req.user._id
    }).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    }, (e) => {
      res.status(400).send();
    });
  }
});


app.delete('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  } else {
    // Todo.findByIdAndRemove(id).then((todo) => {
    //   if (!todo) {
    //     return res.status(404).send();
    //   } else {
    //     return res.send({ todo });
    //   }
    // }, (e) => {
    //   res.status(400).send();
    // });

    Todo.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    }).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      } else {
        return res.send({ todo });
      }
    }, (e) => {
      res.status(400).send();
    });
  }
});


app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({ todo });
  }).catch((e) => {
    res.status(400).send();
  })
});


//POST /Users
app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);

  user.save().then(() => {                          //.then(user) is also the same thing //scope
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});


//GET /users/me
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});


//POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {                    //return is used to keep the chain alive so that the .catch can catch if anything fails in the then((user)=>{})
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  })
});


app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});


app.listen(port, () => {
  console.log(`Started up at port: ${port}`);
});

module.exports = { app }
