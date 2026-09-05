import { Business } from '../models/index.js';

export const createBusiness = async (req, res) => {
  try {
    const { name, type } = req.body;

    const business = await Business.create({
      name,
      type,
      userId: req.user.userId,
    });

    res.status(201).json(business);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при создании бизнеса' });
  }
};

export const getMyBusinesses = async (req, res) => {
  try {
    const businesses = await Business.findAll({
      where: { userId: req.user.userId },
    });

    res.status(200).json(businesses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при получении списка бизнесов' });
  }
};

export const updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type } = req.body;

    const business = await Business.findOne({
      where: { id, userId: req.user.userId },
    });

    if (!business) {
      return res.status(404).json({ message: 'Бизнес не найден' });
    }

    business.name = name ?? business.name;
    business.type = type ?? business.type;
    await business.save();

    res.status(200).json(business);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при обновлении бизнеса' });
  }
};

export const deleteBusiness = async (req, res) => {
  try {
    const { id } = req.params;

    const business = await Business.findOne({
      where: { id, userId: req.user.userId },
    });

    if (!business) {
      return res.status(404).json({ message: 'Бизнес не найден' });
    }

    await business.destroy();

    res.status(200).json({ message: 'Бизнес удалён' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при удалении бизнеса' });
  }
};