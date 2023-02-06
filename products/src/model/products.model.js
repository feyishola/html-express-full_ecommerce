
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

module.exports = model('Product', productSchema);