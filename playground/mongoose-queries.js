const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');

let id = '5c2f7c9f5c66429533e025d0';

if(!ObjectID.isValid(id)){
  console.log('Id is not valid');
}

Todo.find({
  _id:id
}).then((todos)=>{
  console.log('Todos: ', todos);
});
//
Todo.findOne({
  _id: id
}).then((todo)=>{
  console.log("Todo ", todo);
});

Todo.findById(id).then((todo)=>{
  if(!todo){
    return console.log("ID not found")
  }
  console.log('Todo By Id', todo);
}).catch((e)=>{
  console.log(e);
});
