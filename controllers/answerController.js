const { answerService } = require('../services/answerService');
const { answerSchema } = require('../validator/validator');

const answerController = {
  createAnswer: async (req, res) => {
    try {
      const { error, value } = answerSchema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const payload = {
        content: value.content,
        file_url: value.file_url,
        user_id: req.user.id,
        question_id: req.params.question_id,
      };
      const result = await answerService.createAnswer(payload);
      return res.status(result.status).json({ message: result.message, data: result.data });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while creating the answer', error: error.message });
    }
  },

  updateAnswer: async (req, res) => {
    try {
      const { error, value } = answerSchema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const existing = await answerService.getOne(req.params.id);
      if (existing.status === 404) {
        return res.status(404).json({ message: 'Answer not found' });
      }
      if (existing.data.user_id !== req.user.id) {
        return res.status(403).json({ message: 'Forbidden: you can only edit your own answers' });
      }
      await existing.data.update(value);
      return res.status(200).json({ message: 'Answer updated successfully', data: existing.data });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while updating the answer', error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const answers = await answerService.getAnswers(req.query);
      return res.status(answers.status).json({ message: answers.message, data: answers.data });
    } catch (error) {
      console.error('Error fetching answers:', error);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const result = await answerService.getOne(req.params.id);
      return res.status(result.status).json({ message: result.message, ...(result.data && { data: result.data }) });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  },

  deleteOne: async (req, res) => {
    try {
      const result = await answerService.deleteOne(req.params.id);
      return res.status(result.status).json({ message: result.message });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error deleting answer', error: error.message });
    }
  },
};

module.exports = { answerController };
