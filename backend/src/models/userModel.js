import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['Standard', 'Administrator'], // The role must be one of these values
      default: 'Standard', // Default role for new users
    },
  },
  { timestamps: true }
);

// Static signup method
userSchema.statics.signup = async function (email, password) {

    // validation 
    if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }


  // Check if email already exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("Email already in use");
  }
  
  // Check if this is the first user, and if so, make them an Administrator
  const isFirstUser = (await this.countDocuments({})) === 0;
  const role = isFirstUser ? 'Administrator' : 'Standard';


  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create new user with the determined role
  const user = await this.create({ email, password: hash, role });

  return user;
};

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}


const User = mongoose.model("User", userSchema);

export default User;