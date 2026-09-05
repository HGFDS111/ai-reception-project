import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const DialogueScript = sequelize.define('DialogueScript', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  greeting: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  objectionFlow: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default DialogueScript;