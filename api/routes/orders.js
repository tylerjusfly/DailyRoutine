const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/products')


router.get('/', (req, res, next) => {
  Order.find()
  .exec()
  .then( docs => {
    res.status(200).send({
      message : "orders fetched",
      orders : docs.map(doc => {
        return {
          productId : doc.productId,
          quantity : doc.quantity,
          status : "pending"
        }

      })
    });
  })
  .catch(err => res.status(500).json({message : err}));
});

router.post('/', (req, res, next) => {
  Product.findById(req.body.productId)
    .then( product => {
      if( !product){
        res.status(500).json({
          message : "Product Not Found"
        });
      }
      const orders = {
        quantity : req.body.quantity,
        productId : req.body.productId
      }
      const newOrder = new Order(orders)
      return newOrder.save()
      .then( result => {
        res.status(200).json({
          message : "order was created",
          Order : result
        })
      })
      .catch(err => res.status(500).json({message : err}));

    })
    .catch(err => res.status(500).json({message : err}));

});




module.exports = router;