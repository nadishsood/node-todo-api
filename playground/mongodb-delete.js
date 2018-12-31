const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client)=>{
  if(err){
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server');

  const db = client.db('TodoApp');

//   //deleteMany
//   db.collection('todos').deleteMany({text: "Something to do"}).then((result)=>{
//     console.log(result);
//   });
//
//   //deleteONe
//   db.collection('todos').deleteOne({text: "eat"}).then((result)=>{
//     console.log(result);
//   });
//

  //findOneAndDelete
  db.collection('todos').findOneAndDelete({text:'dance'})
     .then((results)=>{
       console.log(results);
     });



// db.collection('users').deleteMany({name: 'Rahul'}).then((result)=>{
//   console.log(result);
// });

// db.collection('users').findOneAndDelete({
//    _id: new ObjectID("5c28b48ed095831d9c16ff3b")})
//    .then((results)=>{
//      console.log(results);
//    })

});
