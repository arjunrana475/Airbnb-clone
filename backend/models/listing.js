const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    images: [
      {
        url: String,
        filename: String,
      },
    ],

    price: {
      type: Number,
      min: 0,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "mountains",
        "arctic",
        "farms",
        "deserts",
        "beach",
        "city",
        "pools",
        "cabins",
        "lake",
        "countryside",
      ],
    },

    propertyType: {
      type: String,
      enum: ["house", "apartment", "hotel", "villa", "cabin", "guesthouse"],
    },

    maxGuests: {
      type: Number,
      min: 1,
      required: true,
    },

    bedrooms: {
      type: Number,
      min: 0,
    },

    beds: {
      type: Number,
      min: 0,
    },

    bathrooms: {
      type: Number,
      min: 0,
    },

    amenities: [
      {
        type: String,
      },
    ],

    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },

      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true },
);
