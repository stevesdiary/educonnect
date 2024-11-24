'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Answer.associate = (models) => {
        Answer.belongsTo(models.User, { foreignKey: 'user_id' });
        Answer.belongsTo(models.Question, { foreignKey: 'question_id' });
      };
    }
  }
  Answer.init({
    id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4
		},
    content: {
			type: DataTypes.STRING,
			allowNull: false
		},
    user_id:  {
			type: DataTypes.STRING,
      references: { model: 'users', key: 'id', },
			allowNull: false
		},
    question_id:  {
			type: DataTypes.STRING,
      references: { model: 'questions', key: 'id', },
			allowNull: false
		},
    upvote:  {
			type: DataTypes.STRING,
			allowNull: true
		},
    file_url:  {
			type: DataTypes.STRING,
			allowNull: true
		},
    saved: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Answer',
    tablename: 'Answers',
  });
  return Answer;
};