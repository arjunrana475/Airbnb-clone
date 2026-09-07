require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const ExpressError = require("./utils/expressError.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const app = express();


app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Rate Limiting

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 100,
});

app.use(limiter);


const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// 404 Error

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// Global Error Handler

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;

  res.status(statusCode).json({
    success: false,
    message,
  });
});

// Server

app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
