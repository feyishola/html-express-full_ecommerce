const { Router } = require('express')
const userDAO = require('../dao/user.dao')
const api = Router()

module.exports = () => {

    api.get('/', async (req, res) => {
        
        try {
            let users = await userDAO.getAllUsers()
            res.status(200).json({ allUsers: users })
        } catch (error) {
            res.status(500).json({ error })
        }

    })

    api.get('/:id', async (req, res) => {
        let id = req.params.id
        
        try {
            let user = await userDAO.getSingleUser(id)
            res.status(200).json({ singleUser: user })
        } catch (error) {
            res.status(500).json({ error })
        }

    });



    api.post('/', async (req, res) => {
        let { userName,email,address,userCategory,password }= req.body
        
        try {
            let user = await userDAO.createUser(userName,email,address,userCategory,password)
            res.status(200).json({ user })
        } catch (error) {
            res.status(500).json({ error })
        }

    });

    api.post('/login', async (req, res) => {
        let { email, password } = req.body
        try {
            let user = await userDAO.login(email, password)
            if (!user) {
                res.status(500).json({ msg: "login failed" })
            } else {
                res.status(200).json({ msg: "login successful", user })
            }
        } catch (error) {
            res.status(500).json({ msg: error })
        }
    });

    api.put('/:id', async (req, res) => {
        let { userName, email, address, userCategory, password } = req.body
        let id = req.params.id
        
        try {
            let userUpdate = await userDAO.updateUser(id, userName, email, address, userCategory,password)
            res.status(200).json({ userUpdate })
        } catch (error) {
            res.status(500).json({ error })
        }


    })

    api.delete('/:id', async (req, res) => {
        let id = req.params.id
        
        try {
            let msg = await userDAO.deleteUser(id)
            if(msg){
                res.status(200).json({ msg })
            }else{
                res.status(200).json({ error:"no user with dis id" })
            }
            
        } catch (error) {
            res.status(500).json({ error })
        }

    })

    return api

}

