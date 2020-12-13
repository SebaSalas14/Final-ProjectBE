const Courses = require('../models/Courses');
const {validationResult} = require('express-validator');

exports.createCourse = async (req,res) =>{
    const errors= validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array});
    }
    const {name}=req.body;
    try{
        let course = await Courses.findOne({name})
        if(course)
        {
            return res.status(400).json({msg: 'El curso ya fue agregado'})
        }
        course = new Courses(req.body);
        await course.save();
        res.json({msg:"Curso guardado"})
    }
    catch(error)
    {
        console.log(error);
        res.status(400).json({msg:'Hubo un error con la petición'})
    }
}

exports.editCourse = async (req,res) =>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array});
    }

    if (!req.body.email || !req.body.password || !req.body.name) {
        return res.status(400).send(
            {
                message: "Los campos requeridos estan vacios",
            }
        );
    }

    // armar json object 
    const user = new User(
        {
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            isActive: req.body.isActive,
            userType: req.body.userType,
        })

    // buscar y modificar
    User
        .findByIdAndUpdate({ _id: req.body.id }, {
            $set: {
                email: user.email, name: user.name, age: user.age, gender: user.gender, isActive: user.isActive,
                userType: user.userType
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error mientras se modificaba el usuario.",
            });
        });

    console.log("modificacion exitosa")

    res.status(200).end()
}

exports.getCourseById = async (req,res) =>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array});
    }
    const {_id}=req.body;
    Courses.findById(_id)
    .then((course) => {
        if (!course) {
            return res.status(404).send({
                message: "Usuario no encontrado"
            });
        }
        res.status(200).send(course);
    })
    .catch((error) => {
        console.log(error);
        return res.status(400).json({msg:"Error en la petición"})
    });
}

exports.getCourses = async (req,res) =>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array});
    }
    Courses.find()
        .then((courses) => {
            res.status(200).send(courses);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({msg:"Hubo un error con la petición"})
        });
}

exports.deleteCourse = async (req,res) =>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array});
    }
    const {_id}=req.body;
    Courses.findByIdAndDelete({_id})
    .then(()=>res.json({msg:"curso borrado"}))
    .catch((error)=> {
        console.log(error)
        res.status(400).json({msg:"Error en la peticion"})
    })
}