const mongoose = require("mongoose");

const mongoDB = process.env.MONGO_URI || "mongodb://localhost:27017/gabfits";

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("✅ Connexion à MongoDB réussie");
});

module.exports = db;
