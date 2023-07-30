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

// retrieves page to modify entries
router.get("/modify", carController.modifyPage);

// edits car
router.post("/modify/edit_car", carController.editCar);

// deletes car
router.post("/modify/delete_car", carController.deleteCar);

// edits category
router.post("/modify/edit_category", categoryController.editCategory);

// deletes category
router.post("/modify/delete_category", categoryController.deleteCategory);

module.exports = router;