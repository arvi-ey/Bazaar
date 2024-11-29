const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    label: {
        type: String,
        required: [true, 'Address label is required'], // e.g., Home, Work
        trim: true
    },
    userId: {
        type: String,
    },
    street: {
        type: String,
        required: [true, 'Street is required'],
        trim: true
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true
    },
    pinCode: {
        type: String,
        required: [true, 'Postal Code is required'],
        trim: true
    },
    landmark: {
        type: String,
    },
    addressType: {
        type: String,
    },
    isDefault: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Address", addressSchema)