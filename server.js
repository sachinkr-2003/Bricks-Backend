const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/db');

// Initialize app
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Basic Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date() });
});

// Routes
const authRoutes = require('./routes/authRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const materialRoutes = require('./routes/materialRoutes');
const updateRoutes = require('./routes/updateRoutes');
const projectRoutes = require('./routes/projectRoutes');
const warrantyRoutes = require('./routes/warrantyRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/updates', updateRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/warranties', warrantyRoutes);
app.use('/api/analytics', analyticsRoutes);

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`[SERVER] Brick By Brick Backend running on port ${PORT}`);
});
