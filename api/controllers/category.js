const Category = require('../models/category');

exports.CategoryController = {

  categoryById : async(req, res, next, id) => {
    const category = await Category.findById(id)
    if(!category){ res.status(500).json({ message : "category Does not exist"});}
    try {
      req.category = category
      next()
    } catch (error) {
      res.status(500).json({ message : "category Error"});  
    }


  },

  create : async(req, res, next) => {
    const category = new Category({
      name : req.body.name,
      shop : req.shop
    });
    try {
      const saved = await category.save()
      res.status(201).json(saved)
      
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }

  },

  getById : (req, res, next) => {
    return res.status(200).json(req.category)
    
    }, //end of get by id

    edit : async(req, res) => {
      let category = req.category
      category.name = req.body.name
      try{
        const updatedCategory = await category.save()
        res.status(200).json(updatedCategory);
      }
      catch(err){
        res.status(500).json(err);
      }
  

    }, //end of update

    remove : async(req, res, next) => {
      let category = req.category
      try {
        await category.remove();
        res.status(200).json({
          category : null,
          message : "category deleted Successfully"
                })
        
      } catch (error) {
        res.status(500).json("category Could not be deleted");
        
      }
    }, //end of category delete

    getall : async(req, res, next) => {
      try {
        const categories = await Category.find()
        res.status(200).json(categories)
        
      } catch (err) {
        res.status(500).json(err);
      }
  
    },




}