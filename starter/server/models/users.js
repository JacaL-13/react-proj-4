const { DataTypes } = require('sequelize')

const { sequelize } = require('../util/database')

module.exports = {User: sequelize.define('users', {
	userId: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	username: DataTypes.STRING,
	hashedPass: DataTypes.STRING
})}