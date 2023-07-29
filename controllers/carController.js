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
// -> edit car
exports.editCar = asyncHandler(async (req, res, next) => {
    const prevName = req.query.prevName;
    const carDetail = {
        name: req.query.newName,
        price: req.query.newPrice,
        description: req.query.newDescription,
        inStock: req.query.newStock,
        category: req.query.newCategory
    }
    const newCar = await Car.find({ name: prevName })
    newCar.name = carDetail.name;
    newCar.price = carDetail.price;
    newCar.description = carDetail.description;
    newCar.category = carDetail.category;
    await newCar.save();
});

// -> delete a car
exports.deleteCar = asyncHandler(async (req, res, next) => {
    const prevName = req.query.prevName;
    await Car.deleteOne({ name: prevName })
})