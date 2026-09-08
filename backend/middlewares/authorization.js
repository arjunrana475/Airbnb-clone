const Listing = require("../models/listing.js");

const isOwner = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found",
    });
  }

  if (listing.owner.toString() !== req.user.userId) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to modify this listing",
    });
  }

  next();
};

module.exports = isOwner;
