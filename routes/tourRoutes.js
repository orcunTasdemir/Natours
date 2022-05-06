const express = require('express');
const fs = require('fs');
const tourController = require('../controllers/tourController.js');
//router definition
const router = express.Router();
const authController = require('../controllers/authController');

//check id middleware
// router.param('id', tourController.checkID);

// router for stats
router.route('/tour-stats').get(tourController.getTourStats);

// monthly plan router
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

// for the top 5 cheap alias
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

//routes for tours
router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  //check body for name and price properties
  .post(tourController.checkBody, tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

//export the router
module.exports = router;
