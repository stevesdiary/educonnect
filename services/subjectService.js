const { Subject, User } = require("../models");
const subjectController = require("../controllers/subjectController");

const subjectService = {
  createSubject: async (payload) => {
    try {
			console.log("PAYLOAD", payload.name);
      const subject = await Subject.findOne({
        where: { name: payload.name },
        attributes: ['name'],
      });
      if (subject) {
        throw new Error(`${payload.name} already exists`);
      }

      const subjectPayload = {
        name: payload.name,
      };

      const createSubject = await Subject.create(subjectPayload);
      return { status: 200, message: 'Subject created successfully', data: createSubject };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

module.exports = subjectService;

