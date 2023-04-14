// 4) routes 🔍✅

const express = require('express');

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authContoller');





const router = express.Router();

// users route
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// protect  all route after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);

router.get('/me', userController.getMe, userController.getuser);

router.patch('/updateMe',  userController.uploadUserPhoto ,  userController.resizeUserPhoto ,  userController.updateMe);

router.delete('/deleteMe', userController.deleteMe);

// restrictTo only adim - all route after this middleware
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getuser)
  .patch(userController.updateuser)
  .delete(userController.deleteuser);

module.exports = router;
