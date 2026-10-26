import User from "./models/user.js";
import bcrypt from "bcrypt";
import connectToDb from "./db/db.js";

const userRegister = async () => {
    connectToDb();
  try {
    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = new User({
      name: "lidon",
      email: "lidon@gmail.com",
      password: hashPassword,
      role: "admin",
    });
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
};

userRegister();