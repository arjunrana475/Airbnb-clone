require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app.js");

const PORT = process.env.PORT || 3000;
const dbUrl = process.env.ATLASDB_URL;

async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(dbUrl);

    console.log("Connected to MongoDB");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

startServer();
