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
  },

  findOne: async (payload) => {
    try {
      const subjeect = await Subject.findOne({
        where: { name: payload.name },
        include: {
          model: Answer,
          as: 'Answers'
        }
      });
      return { status: 200, message: 'Subject found', data: subjeect };
      if (!subjeect) {
        return { status: 404, message: 'Subject not found' };
      }
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  },

  findAll: async (payload) => {
    try {
      const subjects = await Subject.findAll();
      if(subjects.length === 0) {
        return { status: 404, message: 'subjects not found'}
      }
      return { status: 200, message: 'Subjects found!', data: subjects };
    } catch (error) {
      throw error;
    }
  },

  delete: async (payload) => {
    try {
      const deleteSubject = await Subject.destroy({ where: { name: payload.name }});
      if(deleteSubject < 1) {
        return { status: 404, message: 'Record not found or already deleted!'}
      }
      return { status: 200, message: 'Record deleted!', data: deleteSubject };
    } catch (error) {
      throw error;
    }
  }
};

module.exports = subjectService;

