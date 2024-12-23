const { Question, User, Subject, Answer } = require("../models");
// const questionController = require("../controllers/questionController");
const subject = require("../models/subject");


const questionService = {
  createQuestion: async (payload) => {
    try {
      const verifiedUser = await User.findOne({
        where: { 
          id: payload.user_id ,
          is_verified: true
        }
      });
      if (!verifiedUser) {
        return { status: 401, message: "Your email is not yet verified, verify your email and you can ask your questions and give answers too." };
      }
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
  },
  getAll: async (payload) => {
    try {
      const { answer } = payload;
      let includeOptions = [];
      if (answer === 'true') { 
        includeOptions.push({ 
          model: Answer, 
          as: 'answers', 
        }); 
      }
      const question = await Question.findAll({
        include: includeOptions,
      })
      return { status: 200, message: 'Questions fetched successfully', data: question };
    } catch (error) {
      throw error;
    }
  }
};

module.exports = questionService;

