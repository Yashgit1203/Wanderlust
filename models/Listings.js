const mongoose = require("mongoose");
const Review = require("./review.js");
const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description :String,
    price :Number,
    location :String,
    country :String,
    image :{
       url:String,
       filename:String
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    geometry:{
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
})

// Middleware to delete reviews when listing is deleted

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({ _id : {$in : listing.reviews}});
    }
})

let Listing  = mongoose.model("Listing",listingSchema);

module.exports = Listing;