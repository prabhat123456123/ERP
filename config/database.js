const Sequelize = require("sequelize");

const { host, user, password, database } = require("../utils/Constant");

const sequelize = new Sequelize(
	database,
	user,
	password,
	{
		dialect: "mysql",
		host: host,
		define: {
			//prevent sequelize from pluralizing table names
			freezeTableName: true,
			// timestamps: true,
		},
		logging: false,
	},
	{
		pool: {
			max: 100,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	}
);

module.exports = sequelize;
