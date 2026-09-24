import {
  sequelize,
  Business,
  Client,
  CallSession,
  DialogueScript,
  BusinessService,
  Message,
} from '../models/index.js';

const BUSINESS_TYPES = ['dental', 'hotel', 'repair_shop'];

export const createBusiness = async (req, res) => {
  try {
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        message: 'Name and type are required',
      });
    }

    if (!BUSINESS_TYPES.includes(type)) {
      return res.status(400).json({
        message: 'Invalid business type',
      });
    }

    const business = await Business.create({
      name,
      type,
      userId: req.user.userId,
    });

    res.status(201).json(business);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error creating business',
    });
  }
};

export const getMyBusinesses = async (req, res) => {
  try {
    const businesses = await Business.findAll({
      where: {
        userId: req.user.userId,
      },
    });

    res.status(200).json(businesses);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error getting businesses',
    });
  }
};

export const updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type } = req.body;

    if (type !== undefined && !BUSINESS_TYPES.includes(type)) {
      return res.status(400).json({
        message: 'Invalid business type',
      });
    }

    if (name !== undefined && !name.trim()) {
      return res.status(400).json({
        message: 'Business name cannot be empty',
      });
    }

    const business = await Business.findOne({
      where: {
        id,
        userId: req.user.userId,
      },
    });

    if (!business) {
      return res.status(404).json({
        message: 'Business not found',
      });
    }

    business.name = name ?? business.name;
    business.type = type ?? business.type;

    await business.save();

    res.status(200).json(business);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error updating business',
    });
  }
};

export const deleteBusiness = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const business = await Business.findOne({
      where: {
        id,
        userId: req.user.userId,
      },
      transaction,
    });

    if (!business) {
      await transaction.rollback();

      return res.status(404).json({
        message: 'Business not found',
      });
    }

    const calls = await CallSession.findAll({
      where: {
        businessId: business.id,
      },
      attributes: ['id'],
      transaction,
    });

    const callIds = calls.map((call) => call.id);

    if (callIds.length > 0) {
      await Message.destroy({
        where: {
          callSessionId: callIds,
        },
        transaction,
      });
    }

    await CallSession.destroy({
      where: {
        businessId: business.id,
      },
      transaction,
    });

    await Client.destroy({
      where: {
        businessId: business.id,
      },
      transaction,
    });

    await DialogueScript.destroy({
      where: {
        businessId: business.id,
      },
      transaction,
    });

    await BusinessService.destroy({
      where: {
        businessId: business.id,
      },
      transaction,
    });

    await business.destroy({
      transaction,
    });

    await transaction.commit();

    res.status(200).json({
      message: 'Business deleted successfully',
    });
  } catch (error) {
    await transaction.rollback();

    console.error(error);

    res.status(500).json({
      message: 'Error deleting business',
    });
  }
};