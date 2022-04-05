const express = require('express');
const userController = require('../controllers/userController.js');

//router definition
const router = express.Router();

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
