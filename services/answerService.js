const { Answer, User, Subject } = require("../models");
const { getFromRedis, saveToRedis } = require("../config/redisConfig");


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
      return { status: 200, message: 'Answer created successfully', data: createAnswer };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

	getAnswers: async (payload) => {
		try {
      const search = payload.content;
			const answers = await Answer.findAll({
        where: { content: 
          { [Op.like]: search }
        }
      })
// 			const answers = await Answer.findAll(); 
			if (answers.length < 1) {
			  return { status: 200, message: "Records found"}
			};
			if (!answers || answers === null) {
			  return { status: 400, message: "Records not found", data: [] };
			}
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
  getOne: async (payload) => {
    try {
      const answer = await Answer.findOne({payload})
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteOne: async (payload) => {
    try {
      const removeAnswer = await Answer.destroy({
        where: { id: payload }
      });
      if (removeAnswer < 1) {
				console.log("Record not found");
				return { status: 404, message: "Record was not found or already deleted" };
			}
      return { status: 200, message: "Record deleted", data: removeAnswer };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

module.exports = { answerService };
