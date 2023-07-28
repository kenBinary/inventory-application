#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const car = require("./models/car")
const category = require("./models/category")

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log(mongoose.connection.readyState);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createCars();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

let categoryArray = [];

async function categoryCrate(pName) {
    const newCategory = {
        name: pName
    }
    const categoryDocument = new category(newCategory);
    await categoryDocument.save();
    categoryArray = [...categoryArray, categoryDocument];
}

async function createCategories() {
    await Promise.all([
        categoryCrate("Hatchback"),
        categoryCrate("Sedan"),
        categoryCrate("Crossover"),
        categoryCrate("Suv"),
        categoryCrate("MPV"),
        categoryCrate("Van"),
        categoryCrate("Pick-up"),
        categoryCrate("Electrified"),
        categoryCrate("Gazoo Racing"),
    ])
}
async function carCreate(pName, pPrice, pDescription, pNumOfStock, pCategory) {
    const newCar = {
        name: pName,
        price: pPrice,
        description: pDescription,
        inStock: pNumOfStock,
        category: pCategory
    }
    const carDocument = new car(newCar);
    await carDocument.save();
}

async function createCars() {
    await Promise.all([
        carCreate("Hilux", 1174000, "This car can go forward and backward Amazing!", 12, categoryArray[3])
    ])
}