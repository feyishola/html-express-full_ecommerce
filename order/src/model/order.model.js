
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const orderSchema = new Schema({
    customerName: { type: String, required: true },
    userId: { type: String, required: true },
    productCategory: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
});

module.exports = model('Order', orderSchema);