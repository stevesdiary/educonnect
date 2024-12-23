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
      User.hasMany(models.Question, { foreignKey: 'user_id', as: 'questions' });
      User.hasMany(models.Answer, { foreignKey: 'user_id', as: 'answers' });
      User.belongsToMany(models.Badge, { through: 'UserBadge', foreignKey: 'user_id' });
    }
  }
  User.init({
    id:{
			type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
		},
    name: {
			type: DataTypes.STRING,
			allowNull: false
		},
    username: {
			type: DataTypes.STRING,
			allowNull: true,
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
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'student'
    },
    is_verified:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
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