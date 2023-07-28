const express = require("express");
const router = express.Router();
const carController =require("../controllers/carController");

router.get('/:car',carController.getCar)

module.exports = router;