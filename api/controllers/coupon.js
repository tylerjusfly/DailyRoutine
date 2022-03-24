const Coupon = require('../models/coupon');
const Product = require('../models/products')


exports.couponController = {

  couponById : async(req, res, next, id) => {
    const coupon = await Coupon.findById(id).populate('shop', 'shopName')

    if(!coupon){ res.status(500).json({ message : "coupon code does not exist"});}
    try {
      req.coupon = coupon
      next()
    } catch (error) {
      res.status(500).json({ message : "Coupon Not Found"});  
    }

  },
  create : async(req, res, next) => {
    const {code, product, discount} = req.body

    const { price } = await Product.findOne({ _id: product })
    .select("price")
    if(discount < 1 || discount > 100){ res.status(500).json("The field Discount % must be between 1 and 100.")}
    const discountuse = discount/100
    const totalprice = price * discountuse
    const shop = req.shop;
    console.log(req.user)
    
    const couponCode = new Coupon({
      code : code,
      product : product,
      discount : totalprice,
      shop : shop
    })

    try {
      const savedCoupon = await couponCode.save();
      res.status(201).json(savedCoupon);
    } catch (error) {
      res.status(500).json({
        message : "Coupon create error",
        err : error
      });
      
    }

  }, //End of create

  delete : async(req, res, next) => {
    let coupon = req.coupon
    try {
      const delcoupon = await coupon.remove()
      res.status(200).json({
        coupon : null,
        message : "coupon deleted Successfully"
              })
      
    } catch (error) {
      res.status(500).json("Coupon code Could not be deleted");
      
    }

  }, //end of delete

  getall : async(req, res, next) => {
    try {
      const coupons = await Coupon.find({shop : req.params.shopId})
      res.status(200).json({
        message : "Getting all Coupons",
      count : coupons.length,
      coupons : coupons
      })
      
    } catch (error) {
      res.status(500).json("unable to get coupons at this time.")
    }
  },





}