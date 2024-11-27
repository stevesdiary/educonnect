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
      Badge.associate = (models) => { Badge.belongsToMany(models.User, { through: 'UserBadge', foreignKey: 'badge_id' }); };
    }
  }
  Badge.init({
    id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
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
    tableName: 'badges'
  });
  return Badge;
};