const { User, ChatRoom, Message } = require('../models');

const chatService = {
  createRoom: async (payload) => {
    try {
      const room = await ChatRoom.create(payload);
      return {
        status: 201,
        message: "Chat room created successfully!",
        data: room
      };
    } catch (error) {
			console.log(error);
      throw error;
    }
  },

  joinRoom: async (user_id, room_id) => {
    try {
      const room = await ChatRoom.findByPk(room_id);
      const user = await User.findByPk(user_id);
      
      if (!room || !user) {
        return {
          status: 404,
          message: "Room or user not found"
        };
      }

      await room.addParticipant(user);
      return {
        status: 200,
        message: "Joined room successfully",
        data: { room_id, user_id }
      };
    } catch (error) {
			console.error(error);
      throw error;
    }
  },

  getRoomMessages: async (room_id, limit = 50, offset = 0) => {
    try {
      const messages = await Message.findAndCountAll({
        where: { room_id },
        include: [{
          model: User,
          as: 'sender',
          attributes: ['id', 'username']
        }],
        order: [['createdAt', 'DESC']],
        limit,
        offset
      });

      return {
        status: 200,
        message: "Messages retrieved successfully",
        data: messages
      };
    } catch (error) {
			console.error(error);
      throw error;
    }
  },

  getUserRooms: async (user_id) => {
    try {
      const rooms = await ChatRoom.findAll({
        include: [{
          model: User,
          as: 'participants',
          where: { id: user_id },
          attributes: ['id', 'username']
        }]
      });

      return {
        status: 200,
        message: "User rooms retrieved successfully",
        data: rooms
      };
    } catch (error) {
			console.log(error);
      throw error;
    }
  }
};

module.exports = { chatService };