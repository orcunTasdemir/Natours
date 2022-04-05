const express = require('express');
const fs = require('fs');
const tourController = require('../controllers/tourController.js');
//router definition
const router = express.Router();

//check id middleware
// router.param('id', tourController.checkID);

//routes for tours
router
  .route('/')
  .get(tourController.getAllTours)
  //check body for name and price properties
  .post(tourController.checkBody, tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

//export the router
module.exports = router;
