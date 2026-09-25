const express = require('express');
const router = express.Router();
const { login, register, getProfile, updateProfile, getAllUsers, deleteUser, updateUser } = require('../controllers/authController');
const { protect, adminOrManager } = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/register', register); 
router.route('/profile').get(protect, getProfile).put(protect, updateProfile);
router.route('/').get(protect, adminOrManager, getAllUsers);
router.route('/:id')
  .delete(protect, adminOrManager, deleteUser)
  .put(protect, adminOrManager, updateUser);

module.exports = router;
