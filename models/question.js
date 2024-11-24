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
      Question.associate = (models) => { 
        Question.belongsTo(models.User, { foreignKey: 'user_id' }); 
        Question.hasMany(models.Answer, { foreignKey: 'question_id' }); 
      };
    }
  }
  Question.init({
    id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4
		},
    title:  {
			type: DataTypes.STRING,
			allowNull: false
		},
    content:  {
			type: DataTypes.STRING,
			allowNull: false
		},
    user_id:  {
			type: DataTypes.STRING,
			allowNull: false
		},
    subject_id:  {
			type: DataTypes.STRING,
			allowNull: false
		},
    file_url:  {
			type: DataTypes.STRING,
			allowNull: true
		},
  }, {
    sequelize,
    modelName: 'Question',
    tableName: 'Questions',
  });
  return Question;
};