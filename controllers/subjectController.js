const subjectService = require('../services/subjectService.js');
const { subjectSchema } = require('../validator/validator');

const subjectController = {
  createSubject: async (req, res) => {
    try {
      const { error, value } = subjectSchema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({ message: 'Validation Error', errors: error.details });
      }
      const result = await subjectService.createSubject({ name: value.name });
      return res.status(result.status).json({ message: result.message, data: result.data });
    } catch (error) {
      console.error('Error creating subject:', error);
      return res.status(500).json({ message: 'An error occurred while creating the subject', error: error.message });
    }
  },

  updateSubject: async (req, res) => {
    try {
      const { error, value } = subjectSchema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({ message: 'Validation Error', errors: error.details });
      }
      const existing = await subjectService.findOne({ id: req.params.id });
      if (existing.status === 404) {
        return res.status(404).json({ message: 'Subject not found' });
      }
      await existing.data.update(value);
      return res.status(200).json({ message: 'Subject updated successfully', data: existing.data });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error updating subject', error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const result = await subjectService.findAll();
      return res.status(result.status).json({ message: result.message, data: result.data });
    } catch (error) {
      console.error('Error fetching subjects:', error);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const result = await subjectService.findOne({ id: req.params.id });
      return res.status(result.status).json({ message: result.message, ...(result.data && { data: result.data }) });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  },

  deleteOne: async (req, res) => {
    try {
      const result = await subjectService.delete({ id: req.params.id });
      return res.status(result.status).json({ message: result.message });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error deleting subject', error: error.message });
    }
  },
};

module.exports = { subjectController };
