const express=require("express");
const wrapAsync=require("../utils/wrapAsync");
const {listingSchema,reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../Models/listing.js");
const mongoose=require("mongoose");
const review=require("../Models/reviews.js");
const { isLoggedIn,isOwner,validateListing } = require("../middleware.js");
const multer  = require('multer')
const{storage}=require("../cloudConfig.js")
const upload = multer({storage });



const listingController=require("../controllers/listing.js");




const router=express.Router();


//New route
router.route("/new")
.get(isLoggedIn,listingController.renderNewForm)




//Index route
//create route
router
.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
   
    upload.single('listing[image]'), 
     validateListing,
    wrapAsync(listingController.CreateListing));






 

//update route
//Show route
//delete route
router
.route("/:id")
.get(wrapAsync(listingController.ShowListing))
.put(isLoggedIn,isOwner, upload.single('listing[image]'), 
   validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));





 //edit route
 router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));

   


module.exports=router;

   


   
  