import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedPosts: [{ type: String, required: false }],
});

// Check if the model is already compiled to avoid OverwriteModelError
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
