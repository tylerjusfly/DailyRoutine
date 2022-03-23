const Order = require('../models/order');
const Product = require('../models/products')

exports.orderController = {
  create : async(req, res, next) => {
    const {
      product,
      quantity,
      discount,
      email,
    } = req.body

    try {
      const stock = await Product.findById(product);
      if (parseInt(quantity) > stock.stockCount) return res.status(200).json({ message: "Product is out of stock" });
      const price = stock.price
      const totalPrice = quantity * price

      const NewOrder = new Order({
        productId : product,
        name : stock.name,
        quantity : quantity,
        price : price,
        total : totalPrice,
        email : email,
      });

      const update = { stockCount : stock.stockCount - quantity };
      await Product.findByIdAndUpdate(stock.id, update, { new: true });
      const savedOrder = await NewOrder.save();
      return res.status(200).json({ message: "Order created successfully!", savedOrder });


    } catch (error) {
      console.log(error)
      res.status(500).json({
        message : "Coupon create error",
        err : error
      });
    }



  }















}