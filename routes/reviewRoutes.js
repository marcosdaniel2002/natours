const express = require('express');
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} = require('../controllers/reviewController');
const { protect, restricTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/').get(getAllReviews).post(restricTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restricTo('user', 'admin'), updateReview)
  .delete(restricTo('user', 'admin'), deleteReview);

module.exports = router;
