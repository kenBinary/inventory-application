const express = require("express");
const router = express.Router();

// retrieves page to add new entry
router.get("/add", someFunction);

// adds new car
router.post("/newCar", newCar);

// adds new category
router.post("/newCategory", newCategory);

// edits car
router.post("/editCar", test);

// edits cateogry
router.post("/editCategory", test);

// deletes car
router.delete("/deleteCar", test);

// deltes gory
router.delete("/deleteCategory", test);