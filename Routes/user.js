const express=require("express");
const wrapAsync=require("../utils/wrapAsync");
const router=express.Router();
const User=require("../Models/user.js");
const mongoose=require("mongoose");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");


const userController=require("../controllers/user.js");




router
.route("/signup")
.get(userController.signupUser)
.post(userController.createSignup);



router
.route("/login")
.get(userController.loginUser)
.post(
    saveRedirectUrl,
    passport.authenticate(
        'local',
        {failureRedirect:'/login',
        failureFlash:true}),
       userController.createLogin);


router.get("/logout",userController.logoutUser);





module.exports=router;