const express = require("express");
const CategoryController = require("../controllers/categoyController");
const router = express.Router();

router.get("/", CategoryController.read);

module.exports = router;
