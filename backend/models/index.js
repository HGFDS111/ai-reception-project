import sequelize from '../config/database.js';

import User from './user.model.js';
import Business from './business.model.js';
import ServiceTemplate from './serviceTemplate.model.js';
import BusinessService from './businessService.model.js';
import Client from './client.model.js';
import CallSession from './callSession.model.js';
import DialogueScript from './dialogueScript.model.js';
import Message from './message.model.js';

// User -> Business
User.hasMany(Business, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Business.belongsTo(User, {
  foreignKey: 'userId',
});

// Business -> Client
Business.hasMany(Client, {
  foreignKey: 'businessId',
  onDelete: 'CASCADE',
});

Client.belongsTo(Business, {
  foreignKey: 'businessId',
});

// Business -> CallSession
Business.hasMany(CallSession, {
  foreignKey: 'businessId',
  onDelete: 'CASCADE',
});

CallSession.belongsTo(Business, {
  foreignKey: 'businessId',
});

// Client -> CallSession
Client.hasMany(CallSession, {
  foreignKey: 'clientId',
  onDelete: 'CASCADE',
});

CallSession.belongsTo(Client, {
  foreignKey: 'clientId',
});

// Business -> DialogueScript
Business.hasMany(DialogueScript, {
  foreignKey: 'businessId',
  onDelete: 'CASCADE',
});

DialogueScript.belongsTo(Business, {
  foreignKey: 'businessId',
});

// Business <-> ServiceTemplate
Business.belongsToMany(ServiceTemplate, {
  through: BusinessService,
  foreignKey: 'businessId',
  onDelete: 'CASCADE',
});

ServiceTemplate.belongsToMany(Business, {
  through: BusinessService,
  foreignKey: 'serviceTemplateId',
  onDelete: 'CASCADE',
});

// CallSession -> Message
CallSession.hasMany(Message, {
  foreignKey: 'callSessionId',
  onDelete: 'CASCADE',
});

Message.belongsTo(CallSession, {
  foreignKey: 'callSessionId',
});

export {
  sequelize,
  User,
  Business,
  ServiceTemplate,
  BusinessService,
  Client,
  CallSession,
  DialogueScript,
  Message,
};