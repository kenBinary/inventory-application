const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const categoryController = require("../controllers/categoryController");


// retrieves page to add new entry
router.get("/add", carController.addCarPage);
// adds new car
router.post("/add", carController.addCar);

// adds new category
router.post("/add/category", categoryController.addCategory);

// // edits car
// router.post("/editCar", test);

// // edits cateogry
// router.post("/editCategory", test);

// // deletes car
// router.delete("/deleteCar", test);

// // deltes gory
// router.delete("/deleteCategory", test);

module.exports = router;