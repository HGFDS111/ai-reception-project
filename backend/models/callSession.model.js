import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const CallSession = sequelize.define('CallSession', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  result: {
    type: DataTypes.ENUM('booked', 'rejected', 'callback_requested'),
    allowNull: false,
    defaultValue: 'callback_requested',
  },
  startedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default CallSession;