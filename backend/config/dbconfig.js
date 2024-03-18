import { Sequelize } from "sequelize";

export const database = new Sequelize({
    dialect: 'sqlite',
    storage: 'sqlite/appdatabase.db'
});

export default database;

