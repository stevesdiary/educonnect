const questionService = require('../services/questionService');

const questionController = {
  createQuestion: async (req, res) => {
    try {
      const { topic, content, subject, fileUrl } = req.body;
      const payload = { topic, content, user_id: req.user.id, subject, fileUrl };
      const result = await questionService.createQuestion(payload);
      return res.status(result.status).json({ message: result.message, data: result.data });
    } catch (error) {
      console.error('Error creating question:', error);
      return res.status(500).json({ message: 'An error occurred while creating the question', error: error.message });
    }
  },

  updateQuestion: async (req, res) => {
    try {
      const { id } = req.params;
      const existing = await questionService.oneQuestion(id);
      if (existing.status === 404) {
        return res.status(404).json({ message: 'Question not found' });
      }
      if (existing.data.user_id !== req.user.id) {
        return res.status(403).json({ message: 'Forbidden: you can only edit your own questions' });
      }
      const result = await questionService.updateQuestion(id, req.body);
      return res.status(result.status).json({ message: result.message, data: result.data });
    } catch (error) {
      console.error('Error updating question:', error);
      return res.status(500).json({ message: 'An error occurred while updating the question', error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const questions = await questionService.allQuestions(req.query);
      return res.status(questions.status).json({ message: questions.message, data: questions.data });
    } catch (error) {
      console.error('Error fetching questions:', error);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const result = await questionService.oneQuestion(req.params.id);
      return res.status(result.status).json({ message: result.message, ...(result.data && { data: result.data }) });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  },

  deleteOne: async (req, res) => {
    try {
      const result = await questionService.deleteQuestion(req.params.id);
      return res.status(result.status).json({ message: result.message });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error deleting question', error: error.message });
    }
  },
};

module.exports = { questionController };
