if(process.env.NODE_ENV = "production"){
    require('dotenv').config();
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_Atlas = process.env.MONGO_Atlas;
const path = require("path");
const methodOverride = require("method-override");  
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStratergy = require("passport-local");
var MongoDBStore = require('connect-mongodb-session')(session);

const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js")

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const sessionOptions = {
    secret:process.env.SECRET,
    saveUninitialized:true,
    resave:false,
    store:  new MongoDBStore({
        uri: MONGO_Atlas,
        collection: 'mySessions'
      }),
    cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly:true
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));

// app.get("/demouser",async (req,res)=>{
//     let fakeuser = new User({
//         email:"abc@gmail.com",
//         username:"tony"
//     })
//     let registeredUser = await User.register(fakeuser,"hello world");
//     res.send(registeredUser)
// })

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

main().then((res)=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_Atlas);
}

app.get("/",(req,res)=>{
    res.redirect("/listings")
});

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curUser = req.user; // req.user consist of info when user logged in and undefined when logged out
    next();
})



app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);


// Error Handling middleware

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page  not found"));
})

app.use((err,req,res,next)=>{
    let{statusCode = 500 ,message = "Something went wrong"} = err;
    // res.status(status).send(message);
    res.status(statusCode).render("error.ejs",{message});
})

app.listen(8080,()=>{
    console.log("Sever started at port 8080");
});
    