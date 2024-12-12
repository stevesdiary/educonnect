'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Subject.belongsTo(models.Question, { foreignKey: 'subject_id' });
    }
  }
  Subject.init({
    id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true
		},
    name: {
			type: DataTypes.STRING,
			allowNull: false
		},
  }, {
    sequelize,
    modelName: 'Subject',
    tableName: 'subjects',
  });
  return Subject;
};