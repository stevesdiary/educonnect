'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ChatRoom.hasMany(models.Message, { foreignKey: 'room_id', as: 'messages'});
      ChatRoom.belongsToMany(models.User, { foreignKey: 'room_id', through: 'UserRooms', as: 'participants' });
    }
  }
  ChatRoom.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('public', 'private'),
      defaultValue: 'public'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'ChatRoom',
    tableName: 'chatrooms'
  });
  return ChatRoom;
};