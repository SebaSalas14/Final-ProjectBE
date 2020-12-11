const express = require('express');
const router = express.Router();
//Llamar a mi controller
const userController = require('../controllers/userController');
const { check } = require('express-validator');


router.post('/', [
    check('name', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    check('password', 'La longitud minima es de 8 caracteres').isLength({ min: 8 })
],
    userController.createUser)

module.exports = router;

