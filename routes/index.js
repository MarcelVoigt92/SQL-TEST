const express = require("express");
const router = require("express").Router();
const userRoute = require("./users");
const { authenticate } = require("../auth");

router.use("/users", userRoute);

module.exports = router;
