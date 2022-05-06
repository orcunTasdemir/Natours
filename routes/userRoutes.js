const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

//router definition
const router = express.Router();

// signup and login are special cases with a different endpoint
// for example they only post data so there are no need for different API calls
router.post('/signup', authController.signup);
router.post('/login', authController.login);

//routes for users
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

//export router
module.exports = router;
