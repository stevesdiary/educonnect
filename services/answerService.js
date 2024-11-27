const { Answer, User, Subject } = require("../models");
const answerController = require("../controllers/answerController");


const answerService = {
  createAnswer: async (payload) => {
    try {
      // const question_id = payload.question_id;
      //  await Question.findOne({
      //   where: { title: payload.subject },
      //   attributes: ['id'],
      // });
      const answerPayload = {
        content: payload.content,
        user_id: payload.user_id,
        question_id: payload.question_id,
        file_url: payload.file_url,
				upvote: payload.upvote,
      };
      const createAnswer = await Answer.create(answerPayload);
      return { status: 200, message: 'Answer created successfully', data: createAnswer };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

	getAnswers: async () => {
		try {
			// const 
		} catch (error) {
			
		}
	}
};

module.exports = { answerService };
