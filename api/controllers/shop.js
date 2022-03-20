const Shop = require('../models/shop');

exports.shopController = {

  create : async(req, res, next) => {
    const existing = await Shop.shopNameExist(req.body.shopName)

    if(!existing){
      return res.status(409).json({sucess: false, message : "this shopName already exists"})
    }

      newshop = new Shop({
        shopName : req.body.shopName,
        shopOwner : req.user.id
      });
  
      try{
        const savedshop = await newshop.save();
        res.status(201).json({
          message : "shop created",
          shop : savedshop
        });
        
      }
      catch(err){
        res.status(500).json(err)
      }

  } ,//End of create

  edit : async(req, res , next) => {
    const shopId = await Shop.findById(req.params.id)
    
    try{
      const updatedShop = await Shop.findByIdAndUpdate(shopId, {
        $set : req.body
      }, {new : true});
      res.status(200).json(updatedShop);
    }
    catch(err){
      res.status(500).json(err);
    }

  },
  getByuser : async(req, res, next) => {
    try {
      const shops = await Shop.find({shopOwner : req.user.id})
      res.status(200).json(shops)
      
    } catch (err) {
      res.status(500).json(err);
    }

  },

  getall : async(req, res, next) => {
    try {
      const shops = await Shop.find().populate('shopOwner', 'email isAdmin')
      res.status(200).json(shops)
      
    } catch (err) {
      res.status(500).json(err);
    }

  }




}