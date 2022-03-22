const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.authController = {

  // Register
  create : (req, res, next) => {
    User.find( {email : req.body.email})
    .exec()
    .then(user => {
      if (user.length >= 1){
        res.status(409).json({ message : "Mail exixts"})
      }
      else{
  
        bcrypt.hash(req.body.pass, 10, (err, hash) => {
          if(err) {
            return res.status(500).json({ error : err});
          }
          else{
            const user = new User({
              name : req.body.name,
              email : req.body.email,
              pass : hash
            });
            user.save()
            .then(data => {
              res.status(201).json({
                message : "user created",
                user : data
              });
            })
            .catch(err => {
              console.log(err)
              res.status(500).json({errorme : err})
            });
          }
      
        });
  
      }
    });
  
  },


  // Login
  Login : (req, res, next) => {
    const {email, pass} = req.body
  
    const user = User.find({email : email})
    .exec()
    .then(user => {
      if(user < 1){
        return res.status(404).json({ message : "mail not found"})
      }
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if(err) res.status(500).json({ msg : "Bcrypt failed"});
        if(result){
          const token = jwt.sign({
            id : user[0]._id,
            isAdmin : user[0].isAdmin
          }, 'abcd12345', { expiresIn : '30d'})
          return res.status(200).json({ message : 'Auth Success', token : token})
        }
        // failed
        res.status(500).json({ msg : "Bcrypt failed over"});
  
      })
    })
    .catch(err => {
      res.status(500).json({error : err})
    });
  
  }
}