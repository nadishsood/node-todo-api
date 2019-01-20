let {User} = require('./../models/user');

let authenticate = (req, res, next) =>{
  let token = req.header('x-auth'); //getting the value, we pass in the keyword
  //verify token by sending it to a model method
  //create a model method
  User.findByToken(token).then((user)=>{
    if(!user){
      //res.status(401).send({});
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next()
  }).catch((e)=>{
    res.status(401).send({});
  });
};

module.exports = {authenticate};
