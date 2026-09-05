import sequelize from '../config/database.js';
import User from './user.model.js';
import Business from './business.model.js';
import ServiceTemplate from './serviceTemplate.model.js';
import BusinessService from './businessService.model.js';
import Client from './client.model.js';
import CallSession from './callSession.model.js';
import DialogueScript from './dialogueScript.model.js';

// User ↔ Business (one-to-many)
User.hasMany(Business, { foreignKey: 'userId' });
Business.belongsTo(User, { foreignKey: 'userId' });

// Business ↔ Service (one-to-many)
Business.hasMany(CallSession, { foreignKey: 'businessId' });
CallSession.belongsTo(Business, { foreignKey: 'businessId' });

// Client ↔ CallSession (one-to-many)
Client.hasMany(CallSession, { foreignKey: 'clientId' });
CallSession.belongsTo(Client, { foreignKey: 'clientId' });

// Business ↔ DialogueScript (one-to-many: пока допустим несколько сценариев на бизнес)
Business.hasMany(DialogueScript, { foreignKey: 'businessId' });
DialogueScript.belongsTo(Business, { foreignKey: 'businessId' });

// Business ↔ ServiceTemplate (many-to-many через BusinessService)
Business.belongsToMany(ServiceTemplate, { through: BusinessService, foreignKey: 'businessId' });
ServiceTemplate.belongsToMany(Business, { through: BusinessService, foreignKey: 'serviceTemplateId' });

export { sequelize, User, Business, ServiceTemplate, BusinessService, Client, CallSession, DialogueScript };