const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, // Reference to the user who booked
            ref: "User",
            required: true,
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId, // Reference to the booked course
            ref: "Course",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending",
        },
        bookingDate: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Booking", bookingSchema);
