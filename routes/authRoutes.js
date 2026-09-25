const express = require('express');
const router = express.Router();
const { login, softwareLogin, appLogin, register, getProfile, updateProfile, getAllUsers, deleteUser, updateUser } = require('../controllers/authController');
const { protect, adminOrManager } = require('../middleware/authMiddleware');

// Generic login (legacy) 
router.post('/login', login);

// ✅ Separate login endpoints
router.post('/login/software', softwareLogin); // Staff only (admin, manager, supervisor, etc.)
router.post('/login/app', appLogin);           // Customers only (client portal)

router.post('/register', register); 
router.route('/profile').get(protect, getProfile).put(protect, updateProfile);
router.route('/').get(protect, getAllUsers);
router.route('/:id')
  .delete(protect, adminOrManager, deleteUser)
  .put(protect, adminOrManager, updateUser);

module.exports = router;
