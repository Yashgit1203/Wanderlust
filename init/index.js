const mongoose = require("mongoose");
const Listing = require("../models/Listings.js");
// const MONGO_URL =process.env.MONGO_ATLAS;
const initdata = require("./data.js");
main().then((res)=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

let initdb = async ()=>{
    // Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=> ({...obj, owner:"65fec3ee5c27fc10c83b75a9"}))
    Listing.insertMany(initdata.data);
    console.log("Data was inserted!");
}

initdb();