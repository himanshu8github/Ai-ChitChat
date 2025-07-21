import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    uid: { type: String, required: true,  unique: true, },
   name: String,
  email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true,},
  password: { type: String, required: true },

}, 
 {timestamps : true},

)

const User = mongoose.model("User", userSchema);
export default User;