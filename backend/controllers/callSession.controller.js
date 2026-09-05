import {
  Business,
  Client,
  CallSession,
} from '../models/index.js';

export const createCallSession = async (req, res) => {
  try {
    const { businessId, phone, name, result } = req.body;

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