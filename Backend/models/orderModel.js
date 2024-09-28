const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    shippingAddress: {
        province: { type: String, required: true },
        district: { type: String, required: true },
        municipality: { type: String, required: true },
        wardNo: { type: String, required: true },
        village: { type: String, required: true },
        detailedAddress: { type: String },
        mobileNumber: { type: String, required: true },  // Added mobile number
    },
    paymentMethod: { 
        type: String, 
        enum: ['Cash on Delivery'], // Only COD payment method for this model
        required: true 
    },
    paymentStatus: { 
        type: String, 
        enum: ['Pending'], // For COD, the payment status will always be 'Pending'
        default: 'Pending'
    },
    totalAmount: { 
        type: Number, 
        required: true 
    },
    deliveryCharge: { 
        type: Number, 
        required: true 
    },
    finalAmount: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'], // Order status
        default: 'Pending'  // COD orders start with 'Pending'
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });  // Automatically manage 'createdAt' and 'updatedAt'

module.exports = mongoose.model('Order', orderSchema);
