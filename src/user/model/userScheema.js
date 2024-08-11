import mongoose, { Types } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s]+$/.test(v);
      },
      message: (props) => {
        `${props.value} is not a valid name! Name should only contain letters and spaces.`;
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  projectId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
    },
  ],
});

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
