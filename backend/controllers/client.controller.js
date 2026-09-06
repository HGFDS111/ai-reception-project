import { Client, Business } from '../models/index.js';

export const createClient = async (req, res) => {
  try {
    const { businessId, phone, name } = req.body;

    const business = await Business.findOne({
      where: {
        id: businessId,
        userId: req.user.userId,
      },
    });

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    const client = await Client.create({
      phone,
      name,
      businessId,
    });

    res.status(201).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating client' });
  }
};

export const getClients = async (req, res) => {
  try {
    const clients = await Client.findAll({
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

    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting clients' });
  }
};