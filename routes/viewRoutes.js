const express = require('express');
const { getOverview, getTour, getLoginForm, getAccount, updateUserData } = require('../controllers/viewController');
const { protect, isLoggedIn } = require('../controllers/authController');

const router = express.Router();

router.get('/', isLoggedIn,getOverview);
router.get('/tour/:slug', protect, getTour);
router.get('/login', isLoggedIn,getLoginForm);
router.get('/me', protect, getAccount)

router.post('/submit-user-data', protect,updateUserData);

module.exports = router;
