import {
  Business,
  Client,
  CallSession,
  DialogueScript,
  Message,
} from '../models/index.js';
import { generateReply } from '../services/dialogue.service.js';
const CALL_RESULTS = [
  'booked',
  'rejected',
  'callback_requested',
];

export const createCallSession = async (req, res) => {
  try {
    const { businessId, phone, name, result } = req.body;
    if (!businessId || !phone || !result) {
  return res.status(400).json({
    message: 'Business, phone and result are required',
  });
}

if (!CALL_RESULTS.includes(result)) {
  return res.status(400).json({
    message: 'Invalid call result',
  });
}

    const business = await Business.findOne({
      where: {
        id: businessId,
        userId: req.user.userId,
      },
    });

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    let client = await Client.findOne({
      where: {
        phone,
        businessId,
      },
    });

    if (!client) {
      client = await Client.create({
        phone,
        name,
        businessId,
      });
    }

    const callSession = await CallSession.create({
      businessId,
      clientId: client.id,
      result,
    });

    res.status(201).json({
      client,
      callSession,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating call session' });
  }
};

export const getCallSessions = async (req, res) => {
  try {
    const callSessions = await CallSession.findAll({
      include: [
        {
          model: Business,
          where: {
            userId: req.user.userId,
          },
          attributes: [],
        },
      ],
    });

    res.status(200).json(callSessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting call sessions' });
  }
};
// Находит звонок, только если он принадлежит бизнесу текущего пользователя
const findOwnCall = (id, userId) =>
  CallSession.findOne({
    where: { id },
    include: [{ model: Business, where: { userId }, attributes: [] }],
  });

export const startSimulation = async (req, res) => {
  try {
    const { businessId, phone, name } = req.body;

    if (!businessId || !phone) {
      return res.status(400).json({ message: 'businessId and phone are required' });
    }

    const business = await Business.findOne({
      where: { id: businessId, userId: req.user.userId },
    });

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    const [client] = await Client.findOrCreate({
      where: { phone, businessId },
      defaults: { name },
    });

    const script = await DialogueScript.findOne({ where: { businessId } });

    const callSession = await CallSession.create({
      businessId,
      clientId: client.id,
    });

    const greeting = await Message.create({
      callSessionId: callSession.id,
      role: 'assistant',
      text: script?.greeting || 'Hello! How can I help you?',
    });

    res.status(201).json({ callSession, messages: [greeting] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error starting simulation' });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Message text is required' });
    }

    const callSession = await findOwnCall(req.params.id, req.user.userId);

    if (!callSession) {
      return res.status(404).json({ message: 'Call not found' });
    }

    const business = await Business.findByPk(callSession.businessId);
    const services = await business.getServiceTemplates({
      joinTableAttributes: ['price'],
    });
    const script = await DialogueScript.findOne({
      where: { businessId: callSession.businessId },
    });

    await Message.create({
      callSessionId: callSession.id,
      role: 'client',
      text: text.trim(),
    });

    const { reply, result } = generateReply({ text, services, script });

    await Message.create({
      callSessionId: callSession.id,
      role: 'assistant',
      text: reply,
    });

    if (result) {
      callSession.result = result;
      await callSession.save();
    }

    const messages = await Message.findAll({
      where: { callSessionId: callSession.id },
      order: [['id', 'ASC']],
    });

    res.status(200).json({ callSession, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending message' });
  }
};

export const getCallMessages = async (req, res) => {
  try {
    const callSession = await findOwnCall(req.params.id, req.user.userId);

    if (!callSession) {
      return res.status(404).json({ message: 'Call not found' });
    }

    const messages = await Message.findAll({
      where: { callSessionId: callSession.id },
      order: [['id', 'ASC']],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting messages' });
  }
};
