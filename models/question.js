'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Question.belongsTo(models.User, { foreignKey: 'user_id', as: "questions" });
      Question.belongsTo(models.Subject, { foreignKey: 'subject_id' });
      Question.hasMany(models.Answer, { foreignKey: 'question_id', as: 'answers' }); 
    };
  }
  Question.init({
    id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
      autoIncrement: true,
		},
    topic:  {
			type: DataTypes.STRING,
			allowNull: false
		},
    content:  {
			type: DataTypes.TEXT,
			allowNull: false
		},
    user_id:  {
			type: DataTypes.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
			allowNull: false
		},
    subject_id:  {
			type: DataTypes.INTEGER,
			allowNull: false,
      references: { model: 'subjects', key: 'id'},
		},
    file_url:  {
			type: DataTypes.STRING,
			allowNull: true
		},
  }, {
    sequelize,
    modelName: 'Question',
    tableName: 'questions',
  });
  return Question;
};