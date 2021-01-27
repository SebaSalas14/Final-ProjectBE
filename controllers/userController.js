//importamos el modelo
const  Courses = require( '../models/Courses');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

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
            return res.json({ token,user})
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error' })
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
                id: user._id
            }
        }
        //para recuperar usuario
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 900
        }, (error, tokenPass) => {
            if (error) throw error;
            main(tokenPass, user);
            res.status(200).json({ tokenPass })
        })
    } catch (error) {
        res.status(500).json({ msg: ' Hubo un error' })
    }


    async function main(tokenPass, user) {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587, //puerto unico
            secure: false,
            auth: {
                user: 'knowledgeacademyrc@gmail.com',
                pass: 'academyRC',
            }

        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"KnowledgeAcademy " <knowledgeacademyrc@gmail.com>', // sender address
            to: `${user.email}`,
            subject: "Recuperar Contraseña ✔", // Subject line
            html: `<p> Hola ${user.name}. Para recuperar su contraseña, haga click en el siguiente link: </p>
            <a href="http://localhost:3000/changepassword/${tokenPass}"> Recuperar contraseña </a> 
            <br>
            <p>El link tiene una duración de 15 minutos</p>
            <p><b>Atte: Knowledge Academy</b></p>` // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    }


}

exports.getFavs = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array })
    }
    Users.findById(req.params.id)
        .then((user) => {
            if (!user) {
                res.status(404).json({ msg: 'Usario no encontrado' })
            }
            res.status(200).send(user.favs)
        }).catch((error) => {
            res.status(400).json({ msg: 'Error en la petición' })
            console.log(error);
        })
}

exports.editUsers = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array });
    }
    try {
        let newUser = await Users.findById(req.params.id);
        console.log(newUser);
        console.log(req.body);
        newUser.subscription=req.body.subscription
        if( newUser.subscription === "Gold" || newUser.subscription === "Free" || newUser.subscription === "Diamond"  ) {
        const editSubscriptions = await Users.findByIdAndUpdate(req.params.id, newUser, { new: true })
        return res.status(200).json(editSubscriptions)
        } 
 return res.status(404).json({msg: "Las Suscripciones solo pueden ser Free, Gold o Diamond"})
        
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error en la petición" })
    }
    res.end()
}

exports.addFavs = async (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array });
    }
    try {
        const {favs} = req.body;
        const newUser = await Users.findById({ _id: req.params.id });
        const course = await Courses.findById({_id: favs});
        newUser.favs = [...newUser.favs, course]
        const editFavs = await Users.findByIdAndUpdate(req.params.id, newUser, { new: true })
         return res.status(200).json(editFavs)
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error en la petición" })
    }
    res.end()
}

exports.changePassword = async (req, res) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array });
    }
    try {
        let user = await Users.findById({_id:req.params.id})
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        const userUpdated= await Users.findByIdAndUpdate({_id: user._id}, user,{new:true})
        res.status(200).json({msg:'La contraseña ha sido actualizada'})
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error en la petición" })
    }
}
