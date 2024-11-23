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
      // define association here
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
			allowNull: false
		},
    question_id:  {
			type: DataTypes.STRING,
			allowNull: false
		},
    upvote:  {
			type: DataTypes.STRING,
			allowNull: true
		},
    image_url:  {
			type: DataTypes.STRING,
			allowNull: true
		},
  }, {
    sequelize,
    modelName: 'Answer',
    tableName: 'Answers',
    paranoid: false
  });
  return Answer;
};