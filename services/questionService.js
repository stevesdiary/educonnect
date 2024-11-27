const { Question, User, Subject } = require("../models");
const questionController = require("../controllers/questionController");
const subject = require("../models/subject");


const questionService = {
  createQuestion: async (payload) => {
    try {
      const subject = await Subject.findOne({
        where: { name: payload.subject },
        attributes: ['id'],
      });
      if (!subject) {
        throw new Error('Subject not found');
      }

      const questionPayload = {
        title: payload.title,
        content: payload.content,
        user_id: payload.user_id,
        subject_id: subject.id,
        fileUrl: payload.fileUrl,
      };

      const createQuestion = await Question.create(questionPayload);
      return { status: 200, message: 'Question created successfully', data: createQuestion };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

module.exports = questionService;

