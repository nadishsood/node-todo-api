//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client)=>{
  if(err){
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server');

  const db = client.db('TodoApp');

  // db.collection('todos').find({
  //   _id: new ObjectID("5c28c68049d96c184079f61d")
  // }).toArray().then((docs)=>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err)=>{
  //   console.log('Unable to fetch todos', err);
  // })

  // db.collection('todos').find().count().then((count)=>{
  //   console.log(`Todos count: ${count}`);
  // }, (err)=>{
  //   console.log('Unable to fetch todos', err);
  // })

  db.collection('users').find({name:'Nadish'}).toArray().then((doc)=>{
    console.log('Users with the name Nadish');
    console.log(JSON.stringify(doc, undefined, 2));
  },(err)=>{
    console.log(`Error: ${err}`);
  })
});
