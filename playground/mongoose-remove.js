const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

Todo.remove({}).then((result)=>{
  console.log(result);
});

//Todo.findOneAndRemove with this we gwt the removed document back
//Todo.findByIdAndRemove
//findOneAndRemove
