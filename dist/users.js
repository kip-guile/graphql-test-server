"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    username: { type: String, required: true },
}, { timestamps: true });
const User = mongoose.model('user', userSchema);
module.exports = User;
//# sourceMappingURL=users.js.map