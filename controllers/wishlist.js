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
    
    // console.log(value);
    let id = wishlist.owner._id;
    let id2 = wishlist.listing._id;
    // console.log(id);
    const idowner = id.toString();
    const idString = id2.toString();
    // console.log(idString);
    let ele = await Wishlist.find({$and:[{'listing':`${idString}`},{'owner':`${idowner}`}]});
    // console.log(ele.length  );
    if(ele.length>0){   
        req.flash("error",`Hotel ${listing.title} is already added to your wishlist!`);
    }else{
        let value = await wishlist.save();
        req.flash("success",`Hotel ${listing.title} has been added to your wishlist! Happy planning!`);
    }
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
module.exports.destroy = async (req,res)=>{

    let{id}=req.params;
    let deletedlisting = await Wishlist.findByIdAndDelete(id);
    console.log(deletedlisting);
    req.flash("success","Listing deleted successfully from wishlist");
    res.redirect("/listings/wishlist");

}