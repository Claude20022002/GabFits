const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Adresse email invalide"],
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["member", "coach", "admin"], // anglais partout
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Méthode pour cacher le mot de passe
usersSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

module.exports = mongoose.model("User", usersSchema);
