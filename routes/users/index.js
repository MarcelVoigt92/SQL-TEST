const User = require("../../db").User;

const jwt = require("jsonwebtoken");
const { authenticate, refreshToken } = require("../../auth");

const router = require("express").Router();

router.route("/register").post(async function (req, res, next) {
  try {
    const newUser = await User.create({
      ...req.body,
    });
    res.send(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/", async function (req, res) {
  try {
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
