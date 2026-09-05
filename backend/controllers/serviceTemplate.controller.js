import { ServiceTemplate } from '../models/index.js';

export const createServiceTemplate = async (req, res) => {
  try {
    const { title, category } = req.body;

    const serviceTemplate = await ServiceTemplate.create({
      title,
      category,
    });

    res.status(201).json(serviceTemplate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating service template' });
  }
};
export const getServiceTemplates = async (req, res) => {
  try {
    const serviceTemplates = await ServiceTemplate.findAll();

    res.status(200).json(serviceTemplates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting service templates' });
  }
};