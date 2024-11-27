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
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
      autoIncrement: true
		},
    content: {
			type: DataTypes.TEXT,
			allowNull: false
		},
    user_id:  {
			type: DataTypes.INTEGER,
      references: { model: 'users', key: 'id', },
			allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
		},
    question_id:  {
			type: DataTypes.INTEGER,
      references: { model: 'questions', key: 'id', },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
    // saved: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: true
    // },
  }, {
    sequelize,
    modelName: 'Answer',
    tableName: 'answers',
    timestamps: true,

  });
  return Answer;
};