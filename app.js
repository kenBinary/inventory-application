const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const categoryRouter = require('./routes/carCategories');
const carRouter = require('./routes/cars')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// using routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories',categoryRouter)
app.use('/cars',carRouter)

// database
// mongodb+srv://admin_compass:gta4henchmen@cluster0.5lkxi9e.mongodb.net/local_library?retryWrites=true&w=majority
// Set up mongoose connection
const databaseUrl = "mongodb+srv://admin:gta4henchmen@cluster0.rb4kkam.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = databaseUrl;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log(mongoose.connection.readyState);
}

const asyncHandler = require("express-async-handler");
const Car = require("./models/car");
const test = asyncHandler(async (req, res, next) => {
  const allCars = await Car.find().exec();
  res.send(allCars)
});
app.get("/test",(req,res)=>{
  res.render("carView");
})
app.get("/tests",(req,res)=>{
  res.render("catalog");
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
