import { Client } from '../models/index.js';

export const createClient = async (req, res) => {
  try {
    const { phone, name } = req.body;

    const client = await Client.create({
      phone,
      name,
    });

    res.status(201).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating client' });
  }
};
export const getClients = async (req, res) => {
  try {
    const clients = await Client.findAll();

    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting clients' });
  }
};