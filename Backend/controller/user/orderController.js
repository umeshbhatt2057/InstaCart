const Order = require('../../models/orderModel'); // Assuming order model is in the models folder

const createOrder = async (req, res) => {
    try {
        // Log the entire request body to see what is being received
        console.log("Request Body:", req.body);

        const { shippingAddress, paymentMethod, totalAmount, deliveryCharge, finalAmount } = req.body;

        // Check if userId is present
        if (!req.userId) {
            console.log("User ID not found in request."); // Debugging output
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }

        // Check if payment method is COD
        if (paymentMethod !== 'Cash on Delivery') {
            console.log("Invalid payment method:", paymentMethod); // Debugging output
            return res.status(400).json({ success: false, message: 'Invalid payment method' });
        }

        // Check if all required fields are provided
        if (!shippingAddress || !totalAmount || !deliveryCharge || !finalAmount || !shippingAddress.mobileNumber) {
            console.log("Missing required order details:", {
                shippingAddress,
                totalAmount,
                deliveryCharge,
                finalAmount
            }); // Debugging output
            return res.status(400).json({ success: false, message: 'Missing required order details' });
        }

        // Validate mobile number
        const mobileRegex = /^[0-9]{10,15}$/; // Adjust regex as needed
        if (!mobileRegex.test(shippingAddress.mobileNumber)) {
            console.log("Invalid mobile number:", shippingAddress.mobileNumber); // Debugging output
            return res.status(400).json({ success: false, message: 'Invalid mobile number' });
        }

        // Log the shipping address to verify its contents
        console.log("Shipping Address:", shippingAddress); // Debugging output

        // Create a new order document
        const newOrder = new Order({
            userId: req.userId, // Now using req.userId directly
            shippingAddress: {
                province: shippingAddress.province,
                district: shippingAddress.district,
                municipality: shippingAddress.municipality,
                wardNo: shippingAddress.wardNo,
                village: shippingAddress.village,
                mobileNumber: shippingAddress.mobileNumber, // Moved to shippingAddress
            },
            paymentMethod,
            totalAmount,
            deliveryCharge,
            finalAmount,
            status: 'Pending', // COD orders are marked as 'Pending'
        });

        // Save the order to the database
        await newOrder.save();

        // Respond with success message and order ID
        res.status(201).json({ 
            success: true, 
            message: 'Order placed successfully', 
            orderId: newOrder._id 
        });
    } catch (error) {
        console.error('Error placing COD order:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to place order', 
            error: error.message 
        });
    }
};

module.exports = { createOrder };