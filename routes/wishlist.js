const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn} = require("../middleware.js");
const wishlistController = require("../controllers/wishlist.js");
router.get(
    "/wishlist",
    isLoggedIn,
    wrapAsync(wishlistController.showlistinginwishlist)
  );
router.get(
    "/:id/wishlist",
    isLoggedIn,
    wrapAsync(wishlistController.addlistingtowishlist)
  );

  module.exports = router;