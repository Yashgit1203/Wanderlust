const express = require("express");
const router = express.Router();

//Posts
router.get("/",(req,res)=>{
    res.send(" I am post ")
})
router.get("/:id",(req,res)=>{
    res.send(" I am post ID ")
})
router.post("/",(req,res)=>{
    res.send(" I am show post ")
})
router.delete("/",(req,res)=>{
    res.send(" I am delete post ")
})

module.exports = router;