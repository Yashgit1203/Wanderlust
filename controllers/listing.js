const Listing = require("../models/Listings");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req,res)=>{
    let alllistings = await Listing.find({});
    let {query}= req.query;
    let searched_listings = await Listing.find({title:{'$regex':`${query}`,'$options':'i'}});
   
    if(query !== undefined){
        alllistings = searched_listings;
    }
    else{
        alllistings = await Listing.find({});
    }
    res.render("listings/index.ejs",{alllistings});
}

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showAllListings = async (req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!")
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
    
}

module.exports.createNewListings = async (req, res) => {

    const newlisting = new Listing(req.body.listing);
    // Geocoding
    let response = await geocodingClient.forwardGeocode({
        query: newlisting.location ,
        limit: 1
      })
        .send();
    newlisting.geometry = response.body.features[0].geometry;

    let url = req.file.path;
    let filename = req.file.filename;
    newlisting.owner = req.user;
    newlisting.image = {url,filename};
    let value = await newlisting.save();
      console.log(value);
    req.flash("success","New Listing Created");
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!")
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_300");

    res.render("listings/edit.ejs",{listing,originalImageUrl});
}

module.exports.updateListing = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`)
}

module.exports.destroy = async (req,res)=>{

    let{id}=req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
}