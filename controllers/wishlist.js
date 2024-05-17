const Wishlist = require("../models/wishlist.js");
const User = require("../models/user.js");
const Listing = require("../models/Listings.js");

module.exports.addlistingtowishlist= async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let wishlist = new Wishlist({
        like:"checked"
    })
    wishlist.listing = listing._id;
    wishlist.owner = req.user;
    let value = await wishlist.save();
    // console.log(value);
    // console.log(await listing.populate("owner"));
    console.log(req.user.email);
    console.log(wishlist.owner.email);
    req.flash("success",`Hotel ${listing.title} has been added to your wishlist! Happy planning!`);
    res.redirect(`/listings`);
}

module.exports.showlistinginwishlist = async(req,res)=>{
    try {
        let user = await User.find({email:req.user.email});
        let allwishlist = await Wishlist.find({owner:user[0]._id}).populate("listing");
        res.render("listings/wishlist.ejs",{allwishlist});
        // console.log(req.user);
    } catch (error) {
        console.log(error);
    }
    

}