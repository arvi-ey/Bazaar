const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: String,
        required: true,
    },
    subTotal: {
        type: Number,
    },
    count: {
        type: Number,
        default: 1,
    },
    product_id: {
        type: String,
        required: true,
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
    image: {
        type: String,
        required: true,
    },
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
    size: {
        type: String,
        required: true,
        enum: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    deliveryTime: {
        type: Number,
        required: true,
        default: 7
    }
})


module.exports = mongoose.model('Cart', cartSchema)
