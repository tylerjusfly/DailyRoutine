const jwt = require('jsonwebtoken');

const verifyToken = ( req, res , next) => {

  let token
  if( req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1]
    
    jwt.verify(token, 'abcd12345', (err, user) => {
      if(err) res.status(403).send('Token not valid');
      req.user = user
      next();
    })

  }
  else{
    return res.status(401).json("Not authenticated");
  }
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if(req.user.id === req.params.id || req.user.isAdmin){
      next()
    }
    else{
      res.status(403).json({msg : "you are not allowed to do that"})
    }
  })
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if(req.user.isAdmin){
      next()
    }
    else{
      console.log(req.user)
      res.status(403).json({messsage : "Unauthorized Admin Access"})
    }
  })
};

const verifyTokenAndShop = (req, res, next) => {
  verifyToken(req, res, () => {
    if(req.user.id == req.shop.shopOwner || req.user.isAdmin ){
      next()
    }
    else{
      res.status(403).json({message : "Unauthorized Shop Access"})
    }
  })
};


module.exports = {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin, verifyTokenAndShop }