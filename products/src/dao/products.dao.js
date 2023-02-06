const Productmodel = require('../model/products.model')

class Productdao {

    constructor() { }

    async createProduct(obj) {
        let newProduct = new Productmodel({
            name: obj.name,
            category: obj.category,
            quantity: obj.quantity,
            price: obj.price
        });
        let result = await newProduct.save()
        return result;
    }

    async getAllProducts() {
        let result = await Productmodel.find()
        return result
    }

    async getSingleProduct(id) {
        let result = await Productmodel.findById(id)
        return result;
    }

    async updateProduct(id, quantity, price) {
        let result = await Productmodel.findByIdAndUpdate({ _id: id }, { $set: { quantity, price } })
        return result;
    }

    async updateQuantity(id, quantity) {
        
        let product = await this.getSingleProduct(id);
        console.log("debugging", product);
        let currentStock = product.quantity;

        if (quantity < 0) {
            if (product.quantity >= quantity) {
                
                currentStock = currentStock === 0 ? 0 :  currentStock -= Math.abs(quantity);
            } 
            
        } else {
            currentStock += quantity;
        }

        let result = await Productmodel.findByIdAndUpdate({ _id: id }, { $set: { quantity: currentStock } })
        return result;
    }

    async deleteProduct(id) {
        let result = await Productmodel.findByIdAndDelete(id)
        return result;
    }

}

module.exports = new Productdao()

