const Listing = require("./models/Listings");
const ExpressError = require("./utils/ExpressError.js");
const{listingSchema,reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in ");
        res.redirect("/login");
    }
    next();
}

// To redirect user to its triggered route

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

// To check user is owner of listing or not

module.exports.isOwner = async (req,res,next)=>{
    let{id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(req.user._id)){
        req.flash("error","You are not the owner of this listing");
        res.redirect(`/listings/${id}`);
    }
    else{
        next();
    }
}

// Use to validate listing 

module.exports.validateListing =(req,res,next) =>{
    let { error} =listingSchema.validate(req.body);
    if(error) {
        let errmsg = error.details.map((el) =>el.message).join(",");
        throw new ExpressError(400,errmsg)
    }
    else{
        next();
    }
}

// Use to validate Review

module.exports.validateReview =(req,res,next) =>{
    let { error} = reviewSchema.validate(req.body);
    if(error) {
        let errmsg = error.details.map((el) =>el.message).join(",");
        console.log(error);
        throw new ExpressError(400,errmsg);
    }
    else{
        next();
    }
}


// To check user is author of review or not

module.exports.isReviewAuthor = async (req,res,next)=>{
    let{id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    try {
        if(!review.author.equals(req.user._id)){
            req.flash("error","You are not the author of this listing");
            res.redirect(`/listings/${id}`);
        }
        else{
            next();
        }
    } catch (err) {
        console.log(err);
    }
}