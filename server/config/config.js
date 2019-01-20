let env = process.env.NODE_ENV || 'development'; //in case of production and test there will be an env letiable

//console.log('env ****', env);

if(env === 'development'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoApp';
}else if(env == 'test'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoAppTest';
}
