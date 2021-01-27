"use strict";
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

router.post('/recoverPassword', [
    check('email', 'El email no es valido').isEmail()
], userController.recoverPass)

router.get('/:id/favs', [],
    userController.getFavs )
router.put('/:id/favs' ,[], userController.addFavs)
router.put('/:id',[],userController.editUsers) 
router.put('/changepassword/:id',[
    check('password', 'La longitud minima es de 8 caracteres').isLength({ min: 8 }),
    check('password', 'La longitud máxima es de 16 caracteres').isLength({ max: 16 }),
    check('password', 'No se envio ningún password').not().isEmpty()
], userController.changePassword)


module.exports = router;

