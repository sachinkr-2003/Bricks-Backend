require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
async function fixDB() {
  try {
    if (!uri) throw new Error('MONGODB_URI not found in environment');
    await mongoose.connect(uri);
    const db = mongoose.connection.db;
    const users = await db.collection('users').find({}).toArray();
    let updated = 0;
    for (let user of users) {
      if (user.role && user.role !== user.role.toLowerCase()) {
         await db.collection('users').updateOne(
           { _id: user._id },
           { $set: { role: user.role.toLowerCase() } }
         );
         updated++;
      }
    }
    console.log('Fixed ' + updated + ' users in database.');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
fixDB();
