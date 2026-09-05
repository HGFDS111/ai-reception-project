import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Business = sequelize.define('Business', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('dental', 'hotel', 'repair_shop'),
    allowNull: false,
  },
});

export default Business;