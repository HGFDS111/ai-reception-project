import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ServiceTemplate = sequelize.define('ServiceTemplate', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default ServiceTemplate;