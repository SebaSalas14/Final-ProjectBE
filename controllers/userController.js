//importamos el modelo
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array })
    }
    const { name, email, password, favs, subscription } = req.body;
    try {
        let user = await Users.findOne({ email });
        //Si el usuario existe, entonces que devuelva error
        if (user) {
            res.status(400).json({ msg: 'El usuario ya existe' });
        }
        user = new Users(req.body);
        //Genero Salt 
        const salt = await bcrypt.genSalt(10);
        //Hasheo Paswword
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        //guardo usario y creo paylod para jwt
        const payload = {
            user: {
                id: user._id
            }
        }
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 604800
        }, (error, token) => {
            if (error) throw error;
            res.json({ token })
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error' })
    }
    user = new Users(req.body);
    //Genero Salt 
    const salt = await bcryptjs.genSalt(10);
    //Hasheo Paswword
    user.password = await bcryptjs.hash(password, salt);
    await user.save();
    //guardo usario y creo paylod para jwt
    const payload = {
        user: {
            id : user._id       
        }
}
exports.recoverPass = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array })
    }
    try {
        const { email } = req.body;
        let user = await Users.findOne({ email });
        if (!user) {
            res.status(400).json({ msg: 'No existe un usario registrado con este email' });
        }
        const payload = {
            user: {
                id: user._id,
                favs: user.favs,
                subscription: user.subscription
            }
        }
        //para recuperar usuario
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;
            res.json({ token })
        })
    } catch (error) {
        res.status(500).json({ msg: ' Hubo un error' })
    }
}
}
