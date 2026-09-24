import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const BusinessService = sequelize.define(
  'BusinessService',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    customDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['businessId', 'serviceTemplateId'],
        name: 'business_service_unique',
      },
    ],
  }
);

export default BusinessService;