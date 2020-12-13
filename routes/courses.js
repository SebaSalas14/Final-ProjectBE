const express = require('express');
const router = express.Router();
//Llamar a mi controller
const courseController = require('../controllers/courseController');
const { check } = require('express-validator');


router.get('/', [], courseController.getCourses)
router.get('/id/:id', [], courseController.getCourseById )
router.put('/', [], courseController.editCourse)
router.post('/', [], courseController.createCourse)
router.delete('/', [], courseController.deleteCourse)

module.exports = router;
