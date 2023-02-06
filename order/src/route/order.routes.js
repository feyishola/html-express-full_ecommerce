const { Router } = require('express')
const orderDao = require('../dao/order.dao')
const api = Router()
const nodefetch = require('../microserviceconnection/nodefetch')

module.exports = () => {

    api.get('/', async (req, res) => {

        try {
            let allOrders = await orderDao.getAllOrder()

            res.status(200).json({ allOrders })


            // NodeFetch.microServiceConnection('http://productapp:3001/api/v1/products','GET').then((result)=>{
            //     // console.log(' result from class', result);
            // }).catch((err)=>{
            //     // console.log(' error from class', err);
            // })
            

        } catch (error) {
            res.status(500).json({ error: error.toString() })
        }

    })

    api.get('/:id', async (req, res) => {
        let id = req.params.id

        try {
            let order = await orderDao.getOrder(id)
            res.status(200).json({ order })
        } catch (error) {
            res.status(500).json({ error: error.toString() })
        }

    });



    api.post('/', async (req, res) => {
        let { customerName, userId, productCategory, product, quantity, totalPrice } = req.body

        try {
            let order = await orderDao.makeOrder(customerName, userId, productCategory, product, quantity, totalPrice)

            let prodId = userId

            // sending an update request to the product microservice to update the product quantity since order has been made

            let body = {
                name:product,
                category:productCategory,
                quantity: -1,
                price:totalPrice
            }

            

            let response = await nodefetch.microServiceConnection(`http://productapp:3001/api/v1/products/quantity/${prodId}`,"PUT",body)
            
            console.log("postResponse from productapp", response);


            //checking to see if product quantity is 0; if 0 send a msg product microservice to delete product 
            
            let quantityCheck = response.productUpdate.quantity
            
            if(quantityCheck === 1) {

                nodefetch.microServiceConnection(`http://productapp:3001/api/v1/products/${prodId}`,"DELETE").then((response)=>{
                    console.log("product with zero quantity has been deleted", response);
                }).catch((err)=>{
                    console.log("product with zero quantity has Not been deleted", err);
                })
            }
            
            res.status(200).json({ order })
        } catch (error) {
            res.status(500).json({ error: error.toString() })
        }

    })

    api.post('/bulkorder', async (req, res) => {
        let { customerName, userId, products } = req.body
        console.log("bulk order demand", req.body);

         // sending an update request to the product microservice to update the product quantity since order has been made

         try {
                if(products.length > 1){

                let response = [];
                let quantityCheckArray = []

                for(let i = 0; i < products.length; i++){
                
                let bulkBody = {
                    name:products[i].product,
                    category:products[i].productCategory,
                    quantity: -1,
                    price:products[i].totalPrice
                }

                let result = await nodefetch.microServiceConnection(`http://productapp:3001/api/v1/products/quantity/${products[i].productCategory}`,"PUT",bulkBody)
                
                response.push(result)


                //checking to see if product quantity is 0; if 0 send a msg product microservice to delete product 
            
            let quantityCheck = response[i].productUpdate.quantity
            quantityCheckArray.push(quantityCheck)
            
            if(quantityCheckArray[i] === 1) {
                
                nodefetch.microServiceConnection(`http://productapp:3001/api/v1/products/${response[i].productUpdate._id}`,"DELETE").then((response)=>{
                    console.log("product with zero quantity has been deleted", response);
                }).catch((err)=>{
                    console.log("product with zero quantity has Not been deleted", err);
                })
            }
            
            }
            console.log("postResponse from productapp Array of responses", response);
            console.log("postResponse from productapp Array of responses>>>", quantityCheckArray);
        }

        
       
        
            let bulkOrder = await orderDao.makeBulkOrder(customerName, userId, products)

            console.log("after order has been made", bulkOrder);
            res.status(200).json({ bulkOrder })
        } catch (error) {
            res.status(500).json({ error: error.toString() })
        }

    })

    api.put('/:id', async (req, res) => {
        let { quantity, price } = req.body
        let id = req.params.id

        try {
            let updateOrder = await orderDao.updateOrder(id, quantity, price)
            res.status(200).json({ updateOrder })
        } catch (error) {
            res.status(500).json({ error: error.toString() })
        }


    })

    api.delete('/:id', async (req, res) => {
        let id = req.params.id

        try {
            let msg = await orderDao.deleteOrder(id)
            res.status(200).json({ msg })
        } catch (error) {
            res.status(500).json({ error: error.toString() })
        }

    })

    return api

}

