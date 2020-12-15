const express = require('express');
const router = express.Router();
//Llamo a mi controller
const authController = require('../controllers/authController');
//Llamo a mi middlewares
const auth = require('../middlewares/auth');


router.post('/', auth, authController.authUser);
router.get('/', auth, auth, authController.getAuthUser);
module.exports = router