const { chatService } = require('../services/chatService');

const setupChatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', async (data) => {
      try {
        const { user_id, room_id } = data;
        const result = await chatService.joinRoom(user_id, room_id);
        
        if (result.status === 200) {
          socket.join(room_id);
          socket.emit('roomJoined', { room_id });
          socket.to(room_id).emit('userJoined', { user_id });
        } else {
          socket.emit('error', { message: result.message });
        }
      } catch (error) {
				console.log(error);
        socket.emit('error', { message: 'Failed to join room' });
      }
    });

    socket.on('sendMessage', async (data) => {
      try {
        const { user_id, room_id, content } = data;
        const message = await Message.create({
          content,
          user_id,
          room_id
        });

        const messageWithSender = await Message.findOne({
          where: { id: message.id },
          include: [{
            model: User,
            as: 'sender',
            attributes: ['id', 'username']
          }]
        });

        io.to(room_id).emit('newMessage', messageWithSender);
      } catch (error) {
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = setupChatSocket;