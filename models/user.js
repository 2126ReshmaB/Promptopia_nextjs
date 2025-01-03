import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{0,200}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
});

// The "models" object is provided by the monggose library and stores all the registered models.
// If a model named "User" already exists in the "models" object, it assigns that existing model to the "User" variable
// This prevents redefining the model and ensures that the existing model is reused.

// If does not exists then newly created model is assigned to "User" Variable.

const User = models.User || model("User",UserSchema);
export default User;