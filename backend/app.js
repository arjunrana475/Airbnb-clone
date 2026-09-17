const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const port = process.env.PORT || 3000;


const listingRouter = require("./routes/listingRoute.js");
// const reviewRouter = require("./routes/reviewRoute.js");
const userRouter = require("./routes/userRoute");
const { default: connectDB } = require("./config/db.js");
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

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 100,
});

app.use(limiter);


app.use("/api/listings", listingRouter);
// app.use("/api/listings/:id/reviews", reviewRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
  connectDB;
  console.log(`Server listening to port ${port}.`);
})
