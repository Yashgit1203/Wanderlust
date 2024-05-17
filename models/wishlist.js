// const { required } = require("joi");
const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    like:{
        type:String,
        enum:['checked','Unchecked'],
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    listing:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing"
    }
})
let Wishlist  = mongoose.model("Wishlist",wishlistSchema);
module.exports = Wishlist;