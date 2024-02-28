const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template

  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});

const getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the request tour (including reviews and guides)
  const { slug } = req.params;
  const tour = await Tour.findOne({ slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if(!tour) {
    return next(new AppError('There is no tour with that name.', 404))
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('tour', {
    title: `${tour.name} tour`,
    tour,
  });
});

const getLoginForm = (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

const getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
}

const updateUserData = async(req, res, next) => {
  const {name, email} = req.body;
  const updatedUser = await User.findByIdAndUpdate(req.user.id, {name, email}, { new: true, runValidators: true });

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  })
}

module.exports = { getOverview, getTour, getLoginForm, getAccount, updateUserData };
