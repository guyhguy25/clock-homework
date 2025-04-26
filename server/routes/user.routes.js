const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/managers', userController.getAllManagers);
router.put('/edit-profile', authMiddleware, userController.editProfile);
router.put('/change-manager', authMiddleware, userController.changeManager);
router.get('/my-employees', authMiddleware, userController.getMyEmployees);

module.exports = router;