const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    images: [
        {
            type: String,
            required: true,
        },
    ],
    ratings: {
        type: Number,
        default: 3.5,
        min: 0,
        max: 5,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    deliveryTime: {
        type: Number,
        required: true,
        default: 7
    }
});



module.exports = mongoose.model('Product', productSchema);
