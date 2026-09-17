const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL);
        console.log("DB connected");
    } catch (e) {
        console.log("Error while connecting to DB");
        console.error(e);
    }
}

export default connectDB;