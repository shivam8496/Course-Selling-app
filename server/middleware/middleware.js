const jwt  = require('jsonwebtoken');
const secret = "superS3cr3t1";

function generateToken (data){
      
    return jwt.sign(data,secret);
}

function jwtAuthenticate (req, res ,next){
    var data = req.headers.authorize;
    if(data){
      var token = data.split(' ')[1];
      jwt.verify(token,secret,(err,original)=>{
        if(err) return res.status(403).json({message:"error occured"});
         else{req.user = original;
         next();}
      });
    }
    else {
      res.status(404).json({message:"wrong bearer Token"});
    }
  
}

module.exports = {generateToken,jwtAuthenticate};