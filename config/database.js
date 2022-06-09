import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

//console.log(process.env.SECRET_KEY);

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    define: {
      timestamps: false,
      freezeTableName: true,
    },
    dialectOptions: {
      multipleStatements: true,
    },
    logging: process.env.PRODUCTION === "dev" ? console.log : false,
  }
);

export default db;
