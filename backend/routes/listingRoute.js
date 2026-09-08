const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const listingController = require("../controllers/listingController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const isOwner = require("../middleware/authorization.js");

router
  .route("/")
  .get(wrapAsync(listingController.showAllListings))
  .post(authMiddleware, wrapAsync(listingController.createListing));

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(authMiddleware, isOwner, wrapAsync(listingController.updateListing))
  .delete(authMiddleware, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;
