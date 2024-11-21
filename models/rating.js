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
    }
  }
  Rating.init({
    id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4
		},
    value:  {
			type: DataTypes.INTEGER,
			allowNull: false
		},
    user_id:  {
			type: DataTypes.STRING,
			allowNull: false
		},
    answer_id:  {
			type: DataTypes.STRING,
			allowNull: false
		},
  }, {
    sequelize,
    modelName: 'Rating',
    tableName:
  });
  return Rating;
};