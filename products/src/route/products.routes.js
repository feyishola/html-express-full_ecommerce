const { Router } = require('express')
const productDAO = require('../dao/products.dao')
const api = Router()

module.exports = () => {

    api.get('/', async (req, res) => {
        try {
            let allProducts = await productDAO.getAllProducts()
            res.status(200).json({ allProducts })
        } catch (error) {
            res.status(500).json({ error })
        }

    })

    api.get('/:id', async (req, res) => {
        let id = req.params.id
        try {
            let singleProduct = await productDAO.getSingleProduct(id)
            res.status(200).json({ singleProduct })
        } catch (error) {
            res.status(500).json({ error })
        }

    })

    api.post('/', async (req, res) => {
        let newProduct = req.body
        try {
            let product = await productDAO.createProduct(newProduct)
            res.status(200).json({ product })
        } catch (error) {
            res.status(500).json({ error })
        }

    })

    api.put('/:id', async (req, res) => {
        let { quantity, price } = req.body
        let id = req.params.id;
        try {
            let productUpdate = await productDAO.updateProduct(id, quantity, price)
            res.status(200).json({ productUpdate })
        } catch (error) {
            res.status(500).json({ error })
        }
    });

    api.put('/quantity/:id', async (req, res) => {
        let { quantity } = req.body
        let id = req.params.id;
        try {
            let productUpdate = await productDAO.updateQuantity(id, quantity)
            console.log("checking the product quantity",productUpdate);
            res.status(200).json({ productUpdate})
        } catch (error) {
            res.status(500).json({ error })
        }
    });

    api.delete('/:id', async (req, res) => {
        let id = req.params.id
        try {
            let msg = await productDAO.deleteProduct(id)
            res.status(200).json({ msg })
        } catch (error) {
            res.status(500).json({ error })
        }

    })

    return api

}

