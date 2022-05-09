const controller = {};
const { User } = require('../models/User');
const UserService = require('../services/UserService')

controller.getUsers = (req, res) => {

    return res.status(200).json({
        msj: "hola"
    })
}

controller.saveUsers = async (req, res) => {
    
    try{
        const userSaved = await UserService.saveUser(req.body);
        if(!userSaved.success) {
            return res.status(409).json(userSaved.content);
        }
        return res.status(201).json(userSaved.content);
    }catch (e){
        console.log(e)
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
    
}

controller.loginUser = async (req,res) => {
    try{
        const loginUser = await UserService.loginUser(req.body);
        if(!loginUser.success){
            return res.status(409).json(loginUser.content)
        }
        return res.status(200).json(loginUser)
    }catch(e) {
        console.log(e)
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

module.exports = controller