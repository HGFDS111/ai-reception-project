import {
  Business,
  ServiceTemplate,
  BusinessService,
} from '../models/index.js';

export const addServiceToBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { serviceTemplateId, price, customDescription } = req.body;

    if (!serviceTemplateId || price === undefined) {
      return res.status(400).json({
        message: 'Service and price are required',
      });
    }

    if (Number(price) < 0) {
      return res.status(400).json({
        message: 'Price cannot be negative',
      });
    }

    const business = await Business.findOne({
      where: {
        id: businessId,
        userId: req.user.userId,
      },
    });

    if (!business) {
      return res.status(404).json({
        message: 'Business not found',
      });
    }

    const serviceTemplate = await ServiceTemplate.findByPk(
      serviceTemplateId
    );

    if (!serviceTemplate) {
      return res.status(404).json({
        message: 'Service template not found',
      });
    }

    const existingService = await BusinessService.findOne({
      where: {
        businessId,
        serviceTemplateId,
      },
    });

    if (existingService) {
      return res.status(409).json({
        message: 'This service is already assigned to this business',
      });
    }

    const businessService = await BusinessService.create({
      businessId,
      serviceTemplateId,
      price,
      customDescription,
    });

    res.status(201).json(businessService);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error adding service to business',
    });
  }
};

export const getBusinessServices = async (req, res) => {
  try {
    const { businessId } = req.params;

    const business = await Business.findOne({
      where: {
        id: businessId,
        userId: req.user.userId,
      },
    });

    if (!business) {
      return res.status(404).json({
        message: 'Business not found',
      });
    }

    const services = await business.getServiceTemplates({
      joinTableAttributes: ['price', 'customDescription'],
    });

    res.status(200).json(services);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error getting business services',
    });
  }
};