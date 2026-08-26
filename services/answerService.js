const { Op } = require('sequelize');
const { Answer } = require('../models');

const answerService = {
  createAnswer: async (payload) => {
    try {
      const answerPayload = {
        content: payload.content,
        user_id: payload.user_id,
        question_id: payload.question_id,
        file_url: payload.file_url,
        upvote: payload.upvote,
      };
      const createAnswer = await Answer.create(answerPayload);
      return { status: 201, message: 'Answer created successfully', data: createAnswer };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getAnswers: async (payload) => {
    try {
      const search = payload.content;
      const whereClause = search ? { content: { [Op.iLike]: `%${search}%` } } : {};
      const answers = await Answer.findAll({ where: whereClause });
      if (answers.length === 0) {
        return { status: 404, message: 'No answers found', data: [] };
      }
      return { status: 200, message: 'Answers retrieved successfully', data: answers };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getOne: async (payload) => {
    try {
      const answer = await Answer.findOne({ where: { id: payload } });
      if (!answer) {
        return { status: 404, message: 'Answer not found', data: null };
      }
      return { status: 200, message: 'Answer found', data: answer };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteOne: async (payload) => {
    try {
      const removed = await Answer.destroy({ where: { id: payload } });
      if (removed < 1) {
        return { status: 404, message: 'Answer not found or already deleted' };
      }
      return { status: 200, message: 'Answer deleted successfully' };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = { answerService };
