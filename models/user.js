'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.associate = (models) => {
        User.hasMany(models.Question, { foreignKey: 'user_id' });
        User.hasMany(models.Answer, { foreignKey: 'user_id' });
        User.belongsToMany(models.Badge, { through: 'UserBadge', foreignKey: 'user_id' });
      };
    }
  }
  User.init({
    id:{
			type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
		},
    name: {
			type: DataTypes.STRING,
			allowNull: false
		},
    username: {
			type: DataTypes.STRING,
			allowNull: false,
      unique: true,
		},
    phone: {
      type: DataTypes.STRING,
      allowNull : true,
    },
    email:  {
			type: DataTypes.STRING,
			allowNull: false,
      unique: true

		},
    password: {
			type: DataTypes.STRING,
			allowNull: false
		},
    profile_picture: {

      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM(['male', 'female']),
      allowNull: false,
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    },
    subscribed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,

  });
  return User;
};