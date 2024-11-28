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
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        userType: {
            type: String,
            required: true,
            default: 'user',
            enum: ['user', 'admin']
        },
        phone_number: {
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
        profile_image: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model('User', userSchema);
