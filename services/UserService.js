const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const res = require("express/lib/response");
const dotenv = require('dotenv');
dotenv.config()
const service = {};

service.saveUser = async ({username, pass}) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "Usuario creado exitosamente"
        }
    }
    const salt = await bcrypt.genSalt(10);
    try{
        const userSaved = await User.create({
            username,
            pass: await bcrypt.hash(pass, salt)
        })
        if(!userSaved){
            serviceResponse = {
                success: false,
                content: {
                    error: "El usuario no fue registrado"
                }
            }
        }
        serviceResponse = {
            success: true,
            content: {
                message: "Usuario creado exitosamente"
            }
        }
        return serviceResponse
    }catch (e){
        throw e;
    }
}

service.loginUser = async ({username, pass}) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "Usuario loggeado"
        }
    }
    const user = await User.findOne({
        where: {
            username,
        }
    });
    if(user){
        const password_valid = await bcrypt.compare(pass, user.pass)
        if(password_valid){
            token = jwt.sign({
                "userid": user.userid,
                "username": user.username
            }, process.env.JWTSECRET);
            return serviceResponse = {
                success: true,
                message: token
            };
        }else{
            return serviceResponse = {
                success: false,
                content: {
                    error: "Credenciales incorrectas"
                }
            }
        }
    }else{
        return serviceResponse = {
            success: false,
            content: {
                error: "El usuario no existe"
            }
        }
    }
}
module.exports = service;