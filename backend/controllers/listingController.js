const Listing = require("../models/listing.js");

// GET /listings
module.exports.showAllListings = async (req, res) => {
  const allListings = await Listing.find({}).populate("owner");

  res.status(200).json({
    success: true,
    listings: allListings,
  });
};

// GET /listings/:id
module.exports.showListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found",
    });
  }

  res.status(200).json({
    success: true,
    listing,
  });
};

// POST /listings
module.exports.createListing = async (req, res) => {
  const {
    title,
    description,
    price,
    location,
    country,
    category,
    propertyType,
    maxGuests,
    bedrooms,
    beds,
    bathrooms,
    amenities,
  } = req.body;

  const newListing = new Listing({
    title,
    description,
    price,
    location,
    country,
    category,
    propertyType,
    maxGuests,
    bedrooms,
    beds,
    bathrooms,
    amenities,

    // Comes from JWT
    owner: req.user.userId,
  });

  await newListing.save();

  res.status(201).json({
    success: true,
    message: "Listing created successfully",
    listing: newListing,
  });
};

// PUT /listings/:id
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  const {
    title,
    description,
    price,
    location,
    country,
    category,
    propertyType,
    maxGuests,
    bedrooms,
    beds,
    bathrooms,
    amenities,
  } = req.body;

  const listing = await Listing.findByIdAndUpdate(
    id,
    {
      title,
      description,
      price,
      location,
      country,
      category,
      propertyType,
      maxGuests,
      bedrooms,
      beds,
      bathrooms,
      amenities,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Listing updated successfully",
    listing,
  });
};

// DELETE /listings/:id
module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findByIdAndDelete(id);

  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Listing deleted successfully",
  });
};
