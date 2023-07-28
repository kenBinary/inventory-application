const Car = require('../models/car');
const asyncHandler = require("express-async-handler");

// car controller needs to:
// -> get particular car based on name
exports.getCar = asyncHandler(async (req, res, next) => {
    const newCar = await Car.find({ name: req.params.car })
    res.send(newCar)
});
// -> add new car
exports.addCar = asyncHandler(async (req, res, next) => {
    const carDetail = {
        name: req.query.name,
        price: req.query.price,
        description: req.query.description,
        inStock: req.query.stock,
        category: req.query.category
    }
    const newCar = new Car(carDetail);
    await newCar.save();
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