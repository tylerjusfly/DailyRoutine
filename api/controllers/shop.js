const Shop = require('../models/shop');

exports.shopController = {

  ShopById : async(req, res, next, id) => {
    const shop = await Shop.findById(id)
    if(!shop){ res.status(500).json({ message : "shop Does not exist"});}
    try {
      req.shop = shop
      next()
    } catch (error) {
      res.status(500).json({ message : "shop Error"});  
    }


  },

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
    const shop = req.shop
    
    try{
      const updatedShop = await Shop.findByIdAndUpdate(shop._id, {
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
      const shops = await Shop.find({shopOwner : req.user.id}).populate('shopOwner', 'name email')
      res.status(200).json({
        status : 'success',
        count : shops.length,
        shops : shops.map( shop => {
          return {
            _id : shop._id,
            name : shop.shopName,
            desc : shop.description,
            owner : shop.shopOwner,
          }
        }) //end
      })
      
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

  },

  getById : (req, res, next) => {
    return res.status(200).json(req.shop)
    
    }, //end of get by id

    delete : async(req, res, next) => {
      let shop = req.shop
      try {
        await shop.remove();
        res.status(200).json({
          product : null,
          message : "shop deleted Successfully"
                })
        
      } catch (error) {
        res.status(500).json("Shop Could not be deleted");
        
      }

    }




}