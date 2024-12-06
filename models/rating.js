'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rating.belongsTo(models.Answer, { foreignKey: 'answer_id', as: 'rating'});
      Rating.belongsTo(models.User, { foreignKey: 'user_id', as: 'ratings'});
    }
  }
  Rating.init({
    id: {
			type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
		},
    value:  {
			type: DataTypes.INTEGER,
			allowNull: false
		},
    user_id:  {
			type: DataTypes.INTEGER,
			allowNull: false,
      references: { model: 'users', key: "id" },
		},
    answer_id:  {
			type: DataTypes.INTEGER,
			allowNull: false,
      preferences: { model: "answers", key: "id" }
		},
  }, {
    sequelize,
    modelName: 'Rating',
    tableName: 'ratings',
  });
  return Rating;
};