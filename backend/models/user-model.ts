import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// This describes what a User looks like in our database
interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  // This is a function to check if a password matches
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// This is the blueprint for User documents in MongoDB
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },        // User's name
    email: { type: String, required: true, unique: true }, // User's email (must be unique)
    password: { type: String, required: true },    // User's password (will be hashed)
    isAdmin: { type: Boolean, required: true, default: false }, // Is this user an admin?
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// This function checks if the entered password matches the stored hashed password
userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  // bcrypt.compare checks if the password is correct
  return await bcrypt.compare(enteredPassword, this.password);
};

// Before saving a user, hash the password if it was changed or is new
userSchema.pre('save', async function (next) {
  // Only hash the password if it was changed
  if (!this.isModified('password')) {
    return next();
  }
  // Create a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// This creates the User model so we can use it in our app
const User = mongoose.model<IUser>('User', userSchema);

export default User;
