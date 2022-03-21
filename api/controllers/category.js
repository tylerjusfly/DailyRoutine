const Category = require('../models/category');

exports.CategoryController = {

  create : async(req, res, next) => {
    const category = new Category(req.body);
    try {
      const saved = await category.save()
      res.status(201).json(saved)
      
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }

  }



}