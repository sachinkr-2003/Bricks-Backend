const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    // Connect to the DB used by the server
    await mongoose.connect('mongodb://localhost:27017/brickbybrick');
    
    console.log('Connected to DB');

    let user = await User.findOne({ phone: '9876543210' });
    if (!user) {
      user = new User({
        name: 'Admin Manager',
        phone: '9876543210',
        pin: '12345678',
        role: 'admin'
      });
      await user.save();
      console.log('✅ Admin user created with new password!');
    } else {
      user.pin = '12345678';
      await user.save();
      console.log('✅ Admin user password updated to 12345678!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB', error);
    process.exit(1);
  }
};

seedAdmin();
