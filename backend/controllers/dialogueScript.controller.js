import { Business, DialogueScript } from '../models/index.js';

export const createDialogueScript = async (req, res) => {
  try {
    const { businessId, greeting, objectionFlow } = req.body;

    const business = await Business.findOne({
      where: {
        id: businessId,
        userId: req.user.userId,
      },
    });

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    const dialogueScript = await DialogueScript.create({
      businessId,
      greeting,
      objectionFlow,
    });

    res.status(201).json(dialogueScript);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating dialogue script' });
  }
};

export const getDialogueScripts = async (req, res) => {
  try {
    const dialogueScripts = await DialogueScript.findAll({
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

    res.status(200).json(dialogueScripts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting dialogue scripts' });
  }
};