const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const { sequelize } = require('./config/db');
const userRoutes = require('./routes/users');
const itemRoutes = require('./routes/items');
const bidRoutes = require('./routes/bids');
const notificationRoutes = require('./routes/notification');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Routes
app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/items', bidRoutes);
app.use('/notifications', notificationRoutes);

// Error handling middleware
app.use(errorHandler);

// Connect to database and start server
const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('Database connected.');
    const server = app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });

    // Initialize Socket.io
    require('./socket')(server);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();

module.exports = app;
