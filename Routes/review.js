const express=require("express");
const wrapAsync=require("../utils/wrapAsync");
const {listingSchema,reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../Models/listing.js");
const mongoose=require("mongoose");
const review=require("../Models/reviews.js");
const { isLoggedIn,isOwner,validateListing,validateReview,isReviewAuthor } = require("../middleware.js");

const reviewController=require("../controllers/reviews.js");



const router=express.Router({mergeParams:true});




//reviews
router.post("/",isLoggedIn,validateReview,validateReview,wrapAsync(reviewController.createReview));




router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports=router;



