import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username require'],
        unique: [true, 'already exist']
    },
    email: {
        type: String,
        required: [true, 'email require'],
        unique: [true, 'already exist']
    },
    password: {
        type: String,
        required: [true, 'Password require']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const userModel = new mongoose.model('user', userSchema);
