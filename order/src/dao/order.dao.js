const OrderModel = require('../model/order.model')

class OrderDao {

    constructor() { }

    async makeOrder(customerName, userId, productCategory, product, quantity, totalPrice) {
        let newOrder = new OrderModel({
            customerName: customerName,
            userId: userId,
            productCategory: productCategory,
            product: product,
            quantity: quantity,
            totalPrice: totalPrice
        });
        let result = await newOrder.save()
        return result;
    }

    async makeBulkOrder(customerName, userId, products) {
        let orders = [];
        if (products.length > 0) {
            for (let i = 0; i < products.length; i++) {
                const { productCategory, product, quantity, totalPrice } = products[i];
                orders.push(
                    new OrderModel({
                        customerName,
                        userId,
                        productCategory,
                        product,
                        quantity,
                        totalPrice
                    })
                );
            }

            let result = await OrderModel.insertMany(orders);
            return result;
        }

    }

    async getAllOrder() {
        let result = await OrderModel.find();
        console.log(result);
        return result;
    }

    async getOrder(id) {
        let result = await OrderModel.findById(id)
        return result;
    }

    async updateOrder(id, quantity, totalPrice) {
        let result = await OrderModel.findByIdAndUpdate({ _id: id }, { $set: { quantity, totalPrice } })
        return result;
    }

    async deleteOrder(id) {
        let result = await OrderModel.findByIdAndDelete(id)
        return result;
    }

}

module.exports = new OrderDao()






