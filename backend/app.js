const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

// const ExpressError = require("./utils/expressError.js");

const listingRouter = require("./routes/listingRoute.js");
// const reviewRouter = require("./routes/reviewRoute.js");
const userRouter = require("./routes/userRoute");
// const bookingRouter = require("./routes/bookingRoute.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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


app.use("/listings", listingRouter);
// app.use("/listings/:id/reviews", reviewRouter);
app.use("/users", userRouter);
// app.use("/bookings", bookingRouter);

// 404 Handler

// app.use((req, res, next) => {
//   next(new ExpressError(404, "Page Not Found!"));
// });

// Global Error Handler

// app.use((err, req, res, next) => {
//   const { statusCode = 500, message = "Something went wrong" } = err;

//   res.status(statusCode).json({
//     success: false,
//     message,
//   });
// });

module.exports = app;
