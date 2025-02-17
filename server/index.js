const express = require('express');
const jwt  = require('jsonwebtoken');
const path = require('path');
const fs= require('fs');
const app = express();
const cors  = require('cors');
const adminRouter =  require('./admin/admin')
const userRouter =  require('./user/user')


app.use(cors());

app.use(express.json());



// const generateToken = (data) =>{
      
//     return jwt.sign(data,secret);
// }

// const jwtAuthenticate = (req, res ,next)=>{
//     var data = req.headers.authorize;
//     if(data){
//       var token = data.split(' ')[1];
//       jwt.verify(token,secret,(err,original)=>{
//         if(err) return res.status(403).json({message:"error occured"});
//          else{req.user = original;
//          next();}
//       });
//     }
//     else {
//       res.status(404).json({message:"wrong bearer Token"});
//     }
  
//   }

app.use('/admin', adminRouter);

app.use('/users',userRouter);

app.get('/' ,  (req, res) => {
  // logic to get all courses
  fs.readFile(path.join(__dirname,"/db/courses.json"),(err,data)=>{
    if(err) res.status(404).send(err + " cannot read File");
    var course = JSON.parse(data).map((element)=>{if(element.published ) return element })  
    res.status(200).json( {courses: course });
  })
});  




// User routes

app.listen(3000, () => {
  console.log(`Server is listening on port 3000 on ${__dirname}`);
});
