//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

let obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server');

  const db = client.db('TodoApp');

  db.collection('todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert todo', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  })

  db.collection('users').insertOne({
    name: "Nadish",
    age: 22,
    location: "Pune"
  }, (err, res) => {
    if (err) {
      return console.log('Unable to insert to users');
    }
    console.log(JSON.stringify(res.ops, undefined, 2));
  })

  client.close();
});
