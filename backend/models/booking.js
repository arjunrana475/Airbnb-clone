const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    listing: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },

    guest: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
      min: 1,
    },

    pricing: {
      nightlyPrice: {
        type: Number,
        required: true,
        min: 0,
      },

      nights: {
        type: Number,
        required: true,
        min: 1,
      },

      cleaningFee: {
        type: Number,
        default: 0,
        min: 0,
      },

      serviceFee: {
        type: Number,
        default: 0,
        min: 0,
      },

      taxes: {
        type: Number,
        default: 0,
        min: 0,
      },

      total: {
        type: Number,
        required: true,
        min: 0,
      },
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    paymentId: {
      type: String,
    },

    cancelledAt: {
      type: Date,
    },

    cancellationReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;

