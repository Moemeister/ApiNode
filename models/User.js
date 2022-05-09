const { DataTypes } = require("sequelize")
const { sequelize } = require("../config/database");
const bcrypt = require("bcrypt");


const User = sequelize.define('usuario', {
    iduser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
    },
    pass: {
        type: DataTypes.STRING,
    }, 
},  {
    timestamps: false,
    freezeTableName: true,
});

module.exports = { User };