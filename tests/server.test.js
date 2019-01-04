const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server/server');
const {Todo} = require('./../server/models/todo');

const todos = [{
  text: "First test todo"
}, {
  text: "Second test todo"
}]

//to delete everything in database before every test case but add the above array
beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(()=>{
    done();
  });
});


describe('POST /todos', ()=>{
  it('should create a new todo', (done)=>{
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text)
      })
      .end((err, res)=>{
        if(err){
          return done(err);
        }

        Todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e)=>done(e));
      })
  });

  //new test case
  it('should not create todo with invalid body data', (done) =>{
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) =>{
        if(err){
          return done(err);
        }
        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2);
          done();
        }).catch((e)=>done(e));
      })
  });
});

describe('GET /todos', ()=>{
  it('should get all todos', (done)=>{
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);//we passed it like this because we're not doing anything async further
  })
})
