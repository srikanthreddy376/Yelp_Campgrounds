var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get("/",function(req,res){
  res.render("landing");
  });

  
//AUTH ROUTES 

router.get("/register",function(req,res){
  res.render("register");
 });
 
 //HANDLE SIGNUP ROUTE

 router.post("/register",function(req,res){
 var newUser = new User({username : req.body.username,email:req.body.email});
 User.register(newUser,req.body.password,function(err,user){
   if(err){
     console.log(err);
     return res.render("register");
   }
   passport.authenticate("local")(req,res,function(){
    req.flash("success","You are Suceesfully Registred! please Login  to Continue");
     res.redirect("/login");
   });
 });
 });
 
 //SHOW- LOGIN FORM
 
 router.get("/login",function(req,res){
     res.render("login");
 
 });

 //POST LOGIN ROUTE 
 
 router.post('/login', passport.authenticate('local',
    { 
    successRedirect:"/campgrounds",
    failureRedirect: '/login',
 
   }),function(req, res) {
       
           
   });
 
   // LOGOUT ROUTE
   
   router.get("/logout",function(req,res){
      req.logout();
      req.flash("success","Successfully Logged out !")
      res.redirect("/");
 
   });
 
 function isLoggedIn(req,res,next){
     if(req.isAuthenticated()){
       return next();
     }

     res.redirect("/login");
   }

   module.exports = router;