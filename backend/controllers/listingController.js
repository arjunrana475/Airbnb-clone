const Listing = require("../models/listing.js");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({
  accessToken: mapToken,
});

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

  const response = await geocodingClient
    .forwardGeocode({
      query: location,
      limit: 1,
    })
    .send();

  if (!response.body.features.length) {
    return res.status(400).json({
      success: false,
      message: "Invalid location",
    });
  }

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

    // 🔐 Comes from JWT
    owner: req.user.userId,

    geometry: response.body.features[0].geometry,
  });

  await newListing.save();

  res.status(201).json({
    success: true,
    message: "Listing created successfully",
    listing: newListing,
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
