const Car = require('../models/car');
const Category = require('../models/category');
const asyncHandler = require("express-async-handler");

// car controller needs to:
// -> get particular car based on name
exports.getCar = asyncHandler(async (req, res, next) => {
    const newCar = await Car.findOne({ name: req.params.car })
    const category = await Category.findOne({ _id: newCar.category });
    res.render("carView", { car: newCar, category: category.name });
    // res.send(newCar)
});
// -> add new car page
exports.addCarPage = asyncHandler(async (req, res, next) => {
    const categories = await Category.find();
    res.render("newEntry", { categories: categories });
});
// -> add new car
exports.addCar = asyncHandler(async (req, res, next) => {
    const category = await Category.findOne({ name: req.body.category });
    const carDetail = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        inStock: req.body.stock,
        category: category._id
    }
    const newCar = new Car(carDetail);
    await newCar.save();
    res.redirect("/operate/add")
});
// -> add modify entry page
exports.modifyPage = asyncHandler(async (req, res, next) => {
    const cars = await Car.find();
    const categories = await Category.find();
    res.render("modifyEntry", { cars: cars, categories: categories });
});

// -> edit car
exports.editCar = asyncHandler(async (req, res, next) => {
    const selectedCar = req.body.selectedCar;
    const category = await Category.findOne({ name: req.body.newCategory });
    const newCar = await Car.findOne({ name: selectedCar })
    newCar.name = req.body.newName
    newCar.price = req.body.newPrice;
    newCar.description = req.body.newDescription;
    newCar.inStock = req.body.newStock;
    newCar.category = category._id;
    console.log(newCar)
    await newCar.save();
    res.redirect("../modify");
});

// -> delete a car
exports.deleteCar = asyncHandler(async (req, res, next) => {
    const selectedCar = req.body.selectedCar;
    await Car.deleteOne({ name: selectedCar })
    res.redirect("../modify");
});