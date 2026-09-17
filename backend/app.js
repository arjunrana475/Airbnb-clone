const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const connectDB = require("./config/db.js");

const userRouter = require("./routes/userRoute.js");
// const listingRouter = require("./routes/listingRoute.js");
// const reviewRouter = require("./routes/reviewRoute.js");

const app = express();

const port = process.env.PORT || 3000;


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


// app.use("/api/listings", listingRouter);
// app.use("/api/listings/:id/reviews", reviewRouter);
app.use("/api/users", userRouter);


const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
