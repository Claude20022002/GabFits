const express = require("express");
const cors = require("cors");
// Import routes
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API GabFits");
});

app.use("/api/users", userRoutes);

module.exports = app;
