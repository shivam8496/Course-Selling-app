const express = require('express');
const path = require('path');
const fs= require('fs');

const { jwtAuthenticate ,  generateToken} = require('../middleware/middleware');

const router = express.Router();

router.post('/signup', (req, res) => {
    const sign = req.body;
    
    var token = generateToken(req.body.username);
    fs.readFile(path.join(__dirname,"../db/admin.json"),(err,data)=>{
      if(err) res.status(404).send(err + " cannot readFile");
      var adminArray=[];
      if(data)  adminArray= JSON.parse(data);
      var check = adminArray.find(a=> a.username === sign.username);
      if(check) return res.status(404).json({message:"admin already exist"})
      adminArray.push(req.body);
      fs.writeFile(path.join(__dirname,"../db/admin.json"),JSON.stringify(adminArray),(err)=>{
        if(err) res.status(404).send(err+" cannot write file");
        res.status(200).json({ message: 'Admin Created Successfully ' , token:`${token}`});    
      })
    })
    
});

router.post('/login' , (req, res) => {
    const { username , password } = req.body;
    fs.readFile(path.join(__dirname,"../db/admin.json"),(err,data)=>{
      if(err) res.status(404).send(err + " cannot read File");
      var adminArray = JSON.parse(data);
      const check = adminArray.find(a=> a.username === username && a.password === password);
      if(!check) res.status(404).json({message:"User not found or  ID Pass wrong"});
      // loginDone 
      else{ 
      var token = generateToken(username);
      console.log(`Login Done for user ${username}`);
      res.status(200).json({message:`Logged in succesfully `,token:`${token}`});}
    })
    

});

router.post('/courses', jwtAuthenticate , (req, res) => {
  // logic to create a course
  var course =  req.body;
  course.courseId=Date.now();
  fs.readFile(path.join(__dirname,"../db/courses.json"),(err,data)=>{
    if(err) res.status(404).send(err + " cannot read File");
    var courseArray = JSON.parse(data);
    courseArray.push(course);
    fs.writeFile(path.join(__dirname,"../db/courses.json"),JSON.stringify(courseArray),(err)=>{
      if(err) res.status(500).send(err + " cannot write the file");
      res.json({message:`Course created created succefully `,courseId:course.courseId});    
    })
  
  })

});



router.get('/courses/:courseId', jwtAuthenticate , (req, res) => {
  // logic to get a course by id
  var id  = parseInt(req.params.courseId);
  fs.readFile(path.join(__dirname , "../db/courses.json"),(err,data)=>{
      if(err) res.status(404).send(err +" cannot read courses file");
      var courseArray = JSON.parse(data);
      var check = courseArray.find(a=> a.courseId === id);
      if(check) {
        res.json({course : check});  
        
      }   
      else  res.status(404).json({meaasge:"Course does Not Exist"});

  })

});

router.put('/courses/:courseId', jwtAuthenticate , (req, res) => {
  // logic to edit a course
  var id  = parseInt(req.params.courseId);
  var course =  req.body;
  // var check = COURSES.find(a=> a.courseId === id);
  fs.readFile(path.join(__dirname , "../db/courses.json"),(err,data)=>{
      if(err) res.status(404).send(err +" cannot read courses file");
      var courseArray = JSON.parse(data);
      var check = courseArray.find(a=> a.courseId === id);
      if(check) {
        Object.assign(check , course);
        fs.writeFile(path.join(__dirname , "../db/courses.json"),JSON.stringify(courseArray),(err)=>{
          if(err) res.status(404).send(err +" cannot write file");
          res.json({message : `Course Updated for CourseID => ${id}`});  
        })
      }   
      else  res.status(404).json({meaasge:"Course does Not Exist"});

  })

});

router.get('/courses', jwtAuthenticate ,  (req, res) => {
  // logic to get all courses
  fs.readFile(path.join(__dirname,"../db/courses.json"),(err,data)=>{
    if(err) res.status(404).send(err + " cannot read File");
    res.status(200).json( {courses: JSON.parse(data) });
  })
});
console.log(__dirname);
module.exports = router;