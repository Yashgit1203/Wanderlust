const express = require("express");
const app = express();

const user = require("./routes/user.js");
const post = require("./routes/post.js");
const path = require("path");
const flash = require("connect-flash");


// const cookieparser = require("cookie-parser");
// app.use(cookieparser("secretmsg"));
// app.use(cookieparser());

const session = require("express-session");
const sessionOptions = {
    secret:"itssecretmsg",
    resave:false,
    saveUninitialized:true
}
app.use(session(sessionOptions));
app.use(flash());
app.use("/post",post);
app.use("/user",user);

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


// Using res.locals

app.use((req,res,next)=>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    next()
})

// app.get("/setname",(req,res)=>{
//     res.cookie("username","yash");
//     res.send("Cookie sent")
// })
// app.get("/getname",(req,res)=>{
//     const name =req.cookies.username;
//     res.send(`Heyy ${name}`)
// })

// app.get("/signedname",(req,res)=>{
//     res.cookie("username","tony",{signed:true});
//     res.send("Cookie sent");
// })
// app.get("/verifyname",(req,res)=>{
//     res.send(req.signedCookies);
// })


//Session

// Storing/accessing name/data in session

// app.get("/register",(req,res)=>{
//     let {name = "anonymous"} = req.query;
//     req.session.name = name;
//     res.redirect("/hello");
// })
// app.get("/hello",(req,res)=>{
//     res.send(`Heyy, ${req.session.name}`);
// })

//using connect-flash

app.get("/register",(req,res)=>{
    let {name = "anonymous"} = req.query;
    if (name ===  "anonymous") {
        req.flash("error","User not registered");
    }
    else{
        req.flash("success","User registered successfully");
    }
    req.session.name = name;
    res.redirect("/hello");
})
app.get("/hello",(req,res)=>{

    res.render("success.ejs",{name:req.session.name});
})


// Example

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count = 1;
//     }
//     res.send(`You send a request ${req.session.count} times`)
// })
app.listen(3000,()=>{
    console.log("Server started successfully!");
})