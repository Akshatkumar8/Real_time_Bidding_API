const socketIo = require('socket.io');
const { Bid, Item, Notification } = require('./models');

module.exports = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('bid', async (data) => {
      try {
        const { itemId, userId, bidAmount } = data;
        
        // Save the bid to the database
        const bid = await Bid.create({ itemId, userId, bidAmount });

        // Update the current price of the item
        const item = await Item.findByPk(itemId);
        item.currentPrice = bidAmount;
        await item.save();

        // Notify all connected clients about the new bid
        io.emit('update', { itemId, bidAmount });

        // Notify the item owner
        const ownerNotification = await Notification.create({
          userId: item.userId,
          message: `Your item ${item.name} received a new bid of ${bidAmount}`,
        });
        socket.to(item.userId).emit('notify', ownerNotification);
      } catch (error) {
        console.error('Error placing bid:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
