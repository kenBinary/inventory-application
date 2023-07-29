const Car = require('../models/car');
const Category = require('../models/category');
const asyncHandler = require("express-async-handler");

// category controller needs to:
// -> get all vehicles based on category
exports.getCars = asyncHandler(async (req, res, next) => {
    const categories = await Category.find();
    const category = await Category.find({ name: req.params.category })
    const cars = await Car.find({ category: category[0]._id })
    let catalogPaths = [1];
    res.render("catalog", { categories: categories, cars: cars });
});
// -> add a category
exports.addCategory = asyncHandler(async (req, res, next) => {
    const categoryDetail = {
        name: req.body.category
    }
    const newCategory = new Category(categoryDetail);
    await newCategory.save();
    res.redirect("/operate/add")
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