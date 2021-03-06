const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;


const userSchema = new Schema({
  username: { type: String, unique: true, required: true},
  image: String,
  password: { type: String, required: true},
  email: { type: String, unique: true, required: true}, 
  favorites: { type: ObjectId, ref: 'Tour'},
  myTours: { type: ObjectId, ref: 'Tour'},
});

const User = mongoose.model('User', userSchema);
module.exports = User;