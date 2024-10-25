const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [50, 'Name cannot exceed 50 characters']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
        },
        cart: {
            type: [],
            default: []
        },
        orders: {
            type: [],
            default: []
        },
        address: {
            type: [],
            default: []
        },
        profile_image: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model('User', userSchema);
