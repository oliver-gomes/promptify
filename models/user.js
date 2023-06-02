import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "This email already exists"],
    required: [true, "Please enter a valid email"],
  },
  username: {
    type: String,
    required: [true, "Please enter a valid username"],
  },
  image: {
    type: String,
  },
  upvotes: {
    type: Array,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
