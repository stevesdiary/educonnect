const { Op } = require('sequelize');
const { Question, User, Subject, Answer } = require('../models');
const eventBus = require('./eventBus');

const questionService = {
  createQuestion: async (payload) => {
    try {
      const verifiedUser = await User.findOne({
        where: { id: payload.user_id, is_verified: true }
      });
      if (!verifiedUser) {
        return { status: 401, message: 'Your email is not yet verified. Please verify your email before posting questions.' };
      }
      const subject = await Subject.findOne({
        where: { name: payload.subject },
        attributes: ['id'],
      });
      if (!subject) {
        return { status: 404, message: 'Subject not found' };
      }
      const questionPayload = {
        topic: payload.topic,
        content: payload.content,
        user_id: payload.user_id,
        subject_id: subject.id,
        file_url: payload.fileUrl,
      };
      const createQuestion = await Question.create(questionPayload);
      eventBus.emit('question.posted', createQuestion);
      return { status: 201, message: 'Question created successfully', data: createQuestion };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  allQuestions: async (payload) => {
    try {
      const search = payload.content;
      const whereClause = search ? { content: { [Op.iLike]: `%${search}%` } } : {};
      const allQuestions = await Question.findAll({
        where: whereClause,
        include: [{ model: Answer, as: 'answers' }]
      });
      if (allQuestions.length === 0) {
        return { status: 404, message: 'No questions found', data: [] };
      }
      return { status: 200, message: 'Questions retrieved successfully', data: allQuestions };
    } catch (error) {
      throw error;
    }
  },

  oneQuestion: async (payload) => {
    try {
      const question = await Question.findOne({
        where: { id: payload },
        include: [{ model: Answer, as: 'answers' }]
      });
      if (!question) {
        return { status: 404, message: 'Question not found', data: null };
      }
      return { status: 200, message: 'Question found', data: question };
    } catch (error) {
      throw error;
    }
  },

  updateQuestion: async (id, updateData) => {
    try {
      const question = await Question.findOne({ where: { id } });
      if (!question) {
        return { status: 404, message: 'Question not found' };
      }
      await question.update(updateData);
      return { status: 200, message: 'Question updated successfully', data: question };
    } catch (error) {
      throw error;
    }
  },

  deleteQuestion: async (payload) => {
    try {
      const deleted = await Question.destroy({ where: { id: payload } });
      if (deleted < 1) {
        return { status: 404, message: 'Question not found or already deleted' };
      }
      return { status: 200, message: 'Question deleted successfully' };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getAll: async (payload) => {
    try {
      const { answer } = payload;
      const includeOptions = answer === 'true' ? [{ model: Answer, as: 'answers' }] : [];
      const questions = await Question.findAll({ include: includeOptions });
      return { status: 200, message: 'Questions fetched successfully', data: questions };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = questionService;
