'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Badge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_Badge.init({
    id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4
		},
    user_id: DataTypes.STRING,
    badge_id: DataTypes.STRING,
    earned_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User_Badge',
  });
  return User_Badge;
};