const Car = require('../models/car');
const Category = require('../models/category');
const asyncHandler = require("express-async-handler");

// category controller needs to:
// -> get all vehicles based on category
exports.getCars = asyncHandler(async (req, res, next) => {
    const category = await Category.find({ name: req.params.category })
    const cars = await Car.find({ category: category[0]._id })
    res.send(cars)
});
// -> add a category
exports.addCategory = asyncHandler(async (req, res, next) => {
    const categoryDetail = {
        name: req.query.category
    }
    const newCategory = new Category(categoryDetail);
    await newCategory.save();
});
// -> delete a category
exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const categoryName = req.query.category;
    await Category.deleteOne({ name: categoryName });
});
// -> edit a category
exports.editCategory = asyncHandler(async (req, res, next) => {
    const prevName = req.query.prevName;
    const newCategory = await Category.find({ name: prevName });
    newCategory.name = req.query.newName;
    await newCategory.save();

});