import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    },

    lastName: {
        type: String,
        required: true,
        min: 1,
        max: 20,
    },

    userName: {
        type: String,
        required: true,
        unique: true
    },

    userEmail: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },

    password: {
        type: String,
        required: true,
        min: 6,
        unique: true
    },

    profilePicture: {
        type: String,
        default: ""
    },

    coverPicture: {
        type: String,
        default: ""
    },

    followers: {
        type: Array,
        default: [],
    },

    followings: {
        type: Array,
        default: [],
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

    desc: {
        type: String,
        max: 50,
    },

    city: {
        type: String,
        max: 50,
    },

    from: {
        type: String,
        max: 50,
    },

    relationship: {
        type: Number,
        enum: [1, 2, 3],
    },
},
    { timestamps: true }
)

export default mongoose.model("User", userSchema)