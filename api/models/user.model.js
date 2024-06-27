import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      uique: true,
    },
    email: {
      type: String,
      required: true,
      uique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, saltRound);
    user.password = hashedPassword;
  } catch (error) {
    next(error)
  }
});

const User = model("User", userSchema);

export default User;
