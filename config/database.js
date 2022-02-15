const mongoose = require('mongoose');

const MONGO_URI = "mongodb://localhost:27017/alvian-fesa";

try {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => console.log("MongoDB connected"));
} catch (err) {
    console.log("Could not connect due to", err);
}

const databaseConnection = mongoose.connection;

module.exports = {
    databaseConnection,
    MONGO_URI
};