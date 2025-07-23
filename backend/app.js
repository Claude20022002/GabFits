const express = require("express");
const cors = require("cors");
// Import routes
const userRoutes = require("./routes/userRoute");
const courseRoutes = require("./routes/courseRoute");
const bookingRoutes = require("./routes/bookingRoute");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API GabFits");
});

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/bookings", bookingRoutes);

module.exports = app;
