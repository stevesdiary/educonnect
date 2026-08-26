const { Op } = require('sequelize');
const { Subject } = require('../models');

const subjectService = {
  createSubject: async (payload) => {
    try {
      const subject = await Subject.findOne({
        where: { name: payload.name },
        attributes: ['name'],
      });
      if (subject) {
        throw new Error(`${subject.name} already exists`);
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
      const where = payload.id ? { id: payload.id } : { name: payload.name };
      const subject = await Subject.findOne({ where });
      if (!subject) {
        return { status: 404, message: 'Subject not found' };
      }
      return { status: 200, message: 'Subject found', data: subject };
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  },

  findAll: async () => {
    try {
      const subjects = await Subject.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });
      if (subjects.length === 0) {
        return { status: 404, message: 'No subjects found', data: [] };
      }
      return { status: 200, message: 'Subjects found', data: subjects };
    } catch (error) {
      throw error;
    }
  },

  delete: async (payload) => {
    try {
      const deleteSubject = await Subject.destroy({ where: { id: payload.id }});
      if(deleteSubject.length < 1) {
        return { status: 404, message: 'Record not found or already deleted!'}
      }
      return { status: 200, message: 'Record deleted!', data: deleteSubject };
    } catch (error) {
      throw error;
    }
  }
};

module.exports = subjectService;
