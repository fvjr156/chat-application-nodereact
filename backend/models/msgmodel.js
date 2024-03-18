import { DataTypes } from 'sequelize';
import database from '../config/dbconfig.js';

const Messages = database.define('Messages', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    datetime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  }, {
    tableName: 'tb_messages',
    timestamps: false
  });

export default Messages;