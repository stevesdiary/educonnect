const { Question, User, Subject, Answer } = require("../models");
const questionController = require("../controllers/questionController");
const subject = require("../models/subject");
const message = require("../models/message");


const questionService = {
  createQuestion: async (payload) => {
    try {
      const verifiedUser = await User.findOne({
        where: { 
          id: payload.user_id,
          is_verified: true
        }
      });
      if (!verifiedUser) {
        return { status: 401, message: "Oops! Your email is not yet verified, verify your email and you can ask your questions and give answers too." };
      }
      const subject = await Subject.findOne({
        where: { name: payload.subject },
        attributes: ['id'],
      });
      if (!subject) {
        throw new Error('Subject not found');
      }

      const questionPayload = {
        topic: payload.topic,
        content: payload.content,
        user_id: payload.user_id,
        subject_id: subject.id,
        fileUrl: payload.fileUrl,
      };

      const createQuestion = await Question.create(questionPayload);
      if (!createQuestion) {
        return { status: 400, message: 'Oops! Question not created', data: null };
      }
      return { status: 200, message: 'Question created successfully', data: createQuestion };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  allQuestions: async (req, res) => {
    try {
      const allQuestions = await Question.findAll({
        include: [
          {
						model: Answer,
						as: 'answers',
          }
        ]
      });
      return { status: 200, message: 'Questions and associated answers', data: allQuestions }
    } catch (error) {
      throw error;
    }
  },

  oneQuestion: async (payload) => {
    try {
      const question = await Question.findOne({
        where: payload,
        include: [
          {
            model: Answer,
            as: 'answers',
          }
        ]
      });
      if (question.length === 0) {
        return { status: 404, message: "Question not found", data: []}
      }
      return { status: 200, message: 'Question found', data: question }
    } catch (error) {
      throw error;
    }
  },

  updateQuestion: async (payload) => {
    try {
      const user_id = req.user.user_id;
      const updateQuestion = await Question.findOne({
        where: payload, 
      })
    } catch (error) {
      throw error;
    }
  },

  deleteQuestion: async (payload) => {
    try {
      const question = await Question.destroy({
        where: { id: payload },
      })
      if (question < 1) {
        console.log("Question not found");
        return { status: 404, message: 'Question not found or deleted' };
      }
      return { status: 200, message: 'Record deleted', data: question };
    } catch (error) {
      throw error;
    }
  }
};

module.exports = questionService;

