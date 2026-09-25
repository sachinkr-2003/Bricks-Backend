const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// Staff roles allowed in the Software (Dashboard)
const SOFTWARE_ROLES = ['admin', 'manager', 'supervisor', 'engineer', 'accountant', 'contractor'];
// Customer roles allowed only in the Mobile App
const APP_ROLES = ['customer'];

// ✅ SOFTWARE LOGIN — Only staff (admin/manager/supervisor/engineer/accountant/contractor)
exports.softwareLogin = async (req, res) => {
  try {
    const { phone, pin } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(401).json({ message: 'Invalid phone number or PIN' });
    if (!SOFTWARE_ROLES.includes(user.role)) {
      return res.status(403).json({ message: 'Access denied. This portal is for staff only. Please use the Brick By Brick App.' });
    }
    if (await user.matchPin(pin)) {
      res.json({ _id: user._id, name: user.name, phone: user.phone, role: user.role, profileImage: user.profileImage, token: generateToken(user._id) });
    } else res.status(401).json({ message: 'Invalid phone number or PIN' });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// ✅ APP LOGIN — Only customers (client portal)
exports.appLogin = async (req, res) => {
  try {
    const { phone, pin } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(401).json({ message: 'Invalid phone number or PIN' });
    if (!APP_ROLES.includes(user.role)) {
      return res.status(403).json({ message: 'Access denied. This app is for clients only. Staff should use the Brick By Brick Software.' });
    }
    if (await user.matchPin(pin)) {
      res.json({ _id: user._id, name: user.name, phone: user.phone, role: user.role, profileImage: user.profileImage, token: generateToken(user._id) });
    } else res.status(401).json({ message: 'Invalid phone number or PIN' });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// Legacy combined login (keep for backward compat but prefer above)
exports.login = async (req, res) => {
  try {
    const { phone, pin } = req.body;
    const user = await User.findOne({ phone });
    if (user && (await user.matchPin(pin))) {
      res.json({ _id: user._id, name: user.name, phone: user.phone, role: user.role, profileImage: user.profileImage, token: generateToken(user._id) });
    } else res.status(401).json({ message: 'Invalid phone number or PIN' });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.register = async (req, res) => {
  try {
    const { name, phone, pin, role, profileImage } = req.body;
    if (await User.findOne({ phone })) return res.status(400).json({ message: 'User already exists' });
    const user = await User.create({ name, phone, pin, role, profileImage: profileImage || '' });
    res.status(201).json({ _id: user._id, name: user.name, phone: user.phone, role: user.role, profileImage: user.profileImage, token: generateToken(user._id) });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-pin');
    if (user) res.json(user);
    else res.status(404).json({ message: 'User not found' });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      if (req.body.pin) user.pin = req.body.pin; // Will be hashed via pre-save
      if (req.body.profileImage !== undefined) user.profileImage = req.body.profileImage;
      const updatedUser = await user.save();
      res.json({ _id: updatedUser._id, name: updatedUser.name, phone: updatedUser.phone, profileImage: updatedUser.profileImage, token: generateToken(updatedUser._id) });
    } else res.status(404).json({ message: 'User not found' });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.getAllUsers = async (req, res) => {
  try { res.json(await User.find().select('-pin')); }
  catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed' });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;
      user.role = req.body.role || user.role;
      if (req.body.pin) user.pin = req.body.pin; 
      if (req.body.profileImage !== undefined) user.profileImage = req.body.profileImage;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};
