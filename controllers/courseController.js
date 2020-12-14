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
    try{
        const course = await Courses.findByIdAndUpdate(req.params.id, req.body,{new:true})  
        res.json(course)
    }
    catch(error)
        {
            console.log(error);
            res.status(400).json({msg:"Error en la petición"})
        }
    res.end()
}

exports.getCourseById = async (req,res) =>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array});
    }
    Courses.findById(req.params.id)
    .then((course) => {
        if (!course) {
            return res.status(404).send({
                msg:" Curso no encontrado"
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

exports.getFeaturedCourses = async (req,res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array});
    }
    const query = {featured:req.query.featured}
    Courses.find(query)
        .then((featured) => {
            if(!featured)
            {
                return res.status(404).json({msg:"Destacados no encontrados"})
            }
            res.status(200).send(featured);
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