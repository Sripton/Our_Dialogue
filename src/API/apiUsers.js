import express from "express";
import { User } from "../db/models";
import bcrypt from "bcrypt";
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { login, password, name } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const createUser = await User.create({
      login,
      password: hashPassword,
      name,
    });
    req.session.userID = createUser.id;
    req.session.userName = createUser.name;
    res.json({
      userID: createUser.id,
      userName: createUser.name,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
  const { login, password } = req.body;
  try {
    const findUserLogin = await User.findOne({ where: { login } });
    const compareUser = await bcrypt.compare(password, findUserLogin.password);
    if (compareUser) {
      req.session.userID = findUserLogin.id;
      req.session.userName = findUserLogin.name;
      res.json({ userID: findUserLogin.id, userName: findUserLogin.name });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
