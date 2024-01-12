const Listing = require("../models/listing");
const Review = require("../models/review")

module.exports.createReview = async (req, res) => {
    try {
      let listing = await Listing.findById(req.params.id);
      
      if (!listing) {
        return res.status(404).send("Listing not found");
      }
  
      let newReview = new Review(req.body.review);
      newReview.author = req.user._id;
      listing.reviews.push(newReview);
  
      await newReview.save();
      await listing.save();
  
      console.log("New review saved");
      req.flash("success", "New Review created")
      res.redirect(`/listings/${listing._id}`);
    } catch (error) {
      console.error("Error saving review:", error);
      res.status(500).send("Internal Server Error");
    }
  }

module.exports.deleteReview = async(req,res)=>{
    console.log("entered")
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
  
    req.flash("success", "Review deleted")
    res.redirect(`/listings/${id}`)
  }