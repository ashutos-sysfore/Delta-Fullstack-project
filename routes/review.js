const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js")


const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
      const errMsg = error.details.map((el) => el.message).join(", ");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
  };

//Post review route
router.post("/",validateReview, wrapAsync(reviewController.createReview));
  
  
  // Delete review route
  router.delete("/:reviewId",isReviewAuthor, wrapAsync(reviewController.deleteReview))


  module.exports = router;