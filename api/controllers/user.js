const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.userController = {

  edit : async(req, res , next) => {
    if (req.body.pass){
      req.body.pass = bcrypt.hashSync(req.body.pass, 10)
    
    }
    try{
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
        $set : req.body
      }, {new : true});
      res.status(200).json(updatedUser);
    }
    catch(err){
      res.status(500).json(err);
    }


  },

  getBYId : async(req, res , next) => {
    try{
      const user = await User.findById(req.params.userId);
      res.status(200).json({data : user})
    }
    catch(err){
      res.status(500).json(err);
    }
},

  // delete
  delete : async(req, res , next) => {
      try{
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({message : "user has been deleted."})
      }
      catch(err){
        res.status(500).json(err);
      }
  },

  getAll : async(req, res , next) => {
    try{
      const user = await User.find();
      res.status(200).json({data : user})
    }
    catch(err){
      res.status(500).json(err);
    }
},





}