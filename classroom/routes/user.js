const express = require("express");
const router = express.Router();

//User
router.get("/",(req,res)=>{
    res.send(" I am user ")
})
router.get("/:id ",(req,res)=>{
    res.send(" I am user ID ")
})
router.post("/",(req,res)=>{
    res.send(" I am show user ")
})
router.delete("/",(req,res)=>{
    res.send(" I am delete user ")
})

module.exports = router;