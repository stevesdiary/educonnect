'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Badge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Badge.init({
    id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4
		},
    name:  {
			type: DataTypes.STRING,
			allowNull: false
		},
    description:  {
			type: DataTypes.STRING,
			allowNull: true
		},
    criteria:  {
			type: DataTypes.STRING,
			allowNull: false
		},
  }, {
    sequelize,
    modelName: 'Badge',
    tableName: 'Badges'
  });
  return Badge;
};