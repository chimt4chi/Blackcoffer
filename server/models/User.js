import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  occupation: String,
  img: String,
});

const User = mongoose.model("User", UserSchema);

export default User;
