const express = require('express');
const jwt  = require('jsonwebtoken');
const path = require('path');
const fs= require('fs');


const { jwtAuthenticate ,  generateToken} = require('../middleware/middleware');

const router = express.Router();





router.post('/signup', (req, res) => {
    const user = {
        ...req.body,
        purchasedCourses: []
    };

    var token = generateToken(req.body.username);
    fs.readFile(path.join(__dirname,"../db/users.json"),(err,data)=>{
      if(err) {
        
        res.status(404).send(err + " cannot readFile");
    }
      var userArray=[];
      if(data)  userArray = JSON.parse(data);
      var check = userArray.find(a=> a.username === user.username);
      if(check) {
        
        return res.status(404).send("user already exist");
    }
      userArray.push(user);
      fs.writeFile(path.join(__dirname,"../db/users.json"),JSON.stringify(userArray),(err)=>{
        if(err){
            
             res.status(404).send(err+" cannot write file");
        }
        res.status(200).json({ message: 'user Created Successfully ' , token:`${token}`});    
      })
    })
    
});

router.post('/login', (req, res) => {
  const { username , password } = req.body;
    

    fs.readFile(path.join(__dirname,"../db/users.json"),(err,data)=>{
      if(err) res.status(404).send(err + " cannot read File");
      var userArray = JSON.parse(data);
      const check = userArray.find(a=> a.username === username && a.password === password);
      if(!check) res.status(404).json({message:"User not found or  ID Pass wrong"});
      // loginDone  
      var token = generateToken(username);
      res.status(200).json({message:`Logged in succesfully `,token:`${token}`});
    })
});

router.get('/courses', jwtAuthenticate , (req, res) => {
  // logic to list all courses
  fs.readFile(path.join(__dirname,"../db/courses.json"),(err,data)=>{
    if(err) res.status(404).send(err + " cannot read File");
    res.json( {courses: JSON.parse(data) });
  })
});

router.put('/courses/:courseId', jwtAuthenticate , (req, res) => {
  // logic to purchase a course
  var id= parseInt(req.params.courseId);
  fs.readFile(path.join(__dirname,"../db/courses.json"),(err,data)=>{
    if(err) {
        console.log("cannot do from first line");
        res.status(404).send(err +" cannot read file");}
    var coursesArray=[];
    if(data){
      coursesArray = JSON.parse(data);
      var check = coursesArray.find(a=> a.courseId === id);
      if(!check){ 
        console.log("cannot do from second line");
        res.send(404).send("Course Does not exist");}
    }
  });
      fs.readFile(path.join(__dirname,"../db/users.json"),(err,data)=>{
        if(err) {
            console.log("cannot do from third line");
            res.status(404).send(err + "cannot read file");
        }
        var userArray = JSON.parse(data);
        var check2 = userArray.find(a=>a.username === req.user);
        check2.purchasedCourses.push(id);
        fs.writeFile(path.join(__dirname,"../db/users.json"),JSON.stringify(userArray),(err)=>{
          if(err) {
            console.log("cannot do from fourth line");
            res.status(404).send(err + " cannot write file");}
          res.status(200).json({message:`Course =>${id} purchased Succesfully`});
        })
      })

});

router.get('/purchasedCourses', jwtAuthenticate , (req, res) => {
  // logic to view purchased courses  
  var purchasedCorse =[];
  fs.readFile(path.join(__dirname,"../db/users.json"),(err,data)=>{
    if(err) res.status(404).send("cannot read file");
    var usersArray = JSON.parse(data);
      var gg = usersArray.find(a=>a.username === req.user);
      console.log(gg.purchasedCourses);
      
      for(var i=0;i<gg.purchasedCourses.length;i++){
        console.log(gg.purchasedCourses[i]);
        purchasedCorse.push(gg.purchasedCourses[i]);
      }
      res.json({purchasedCourses:purchasedCorse});
  })
  

});


module.exports = router;