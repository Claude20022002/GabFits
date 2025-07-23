const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        coachId: {
            type: mongoose.Schema.Types.ObjectId, // Reference à l'utilisateur qui est coach
            ref: "User",
            required: true,
        },
        schedule: {
            type: Date,
            required: true,
            validate: {
                validator: function (value) {
                    return value > new Date();
                },
                message: "La date du cours doit être ultérieure à maintenant.",
            },
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        capacity: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
