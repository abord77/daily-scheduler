const mongoose = require('mongoose');

const db = "mongodb://127.0.0.1:27017/todolistDB";

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(console.log("MongoDB is connected"));
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;