const userModel = require('../model/user.model')

class Userdao {

    constructor() {}

    async createUser(userName,email,address,userCategory,password) {
        let newUser = new userModel({
            userName,
            email,
            address,
            userCategory,
            password
        });
        let result = await newUser.save()
        return result;
    }

    async getAllUsers() {
        let result = await userModel.find()
        return result
    }

    async getSingleUser(id) {
        let result = await userModel.findById(id)
        return result;
    }

    async updateUser(id, userName, email,address,userCategory,password) {
        let result = await userModel.findByIdAndUpdate({ _id: id }, { $set: { userName, email,address,userCategory,password} })
        return result;
    }

    async deleteUser(id) {
        let result = await userModel.findByIdAndDelete(id)
        return result;
    }

    async login(email,password){
        let result = await userModel.findOne({email,password})
        return result;
    }

}

module.exports = new Userdao()

