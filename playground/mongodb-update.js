const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client)=>{
  if(err){
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server');

  const db = client.db('TodoApp');

  // db.collection('todos').findOneAndUpdate({
  //   _id: new ObjectID('5c28b479f798c81d8c4d4229')
  // }, {
  //   $set: {
  //     completed: false
  //   }
  // },{
  //   returnOriginal:false
  // }).then((results)=>{
  //   console.log(results);
  // });

  db.collection('users').findOneAndUpdate({
    _id:new ObjectID('5c29d99a49d96c184079f64c')
  }, {
    $set: {name: 'Rahul'},
    $inc:{age: 1}
  }, {
    returnOriginal: false
  }).then((result)=>{
    console.log(result);
  });



});
