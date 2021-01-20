const express = require('express');
const router = express.Router();
//Llamar a mi controller
const courseController = require('../controllers/courseController');
const { check } = require('express-validator');


router.get('/', [], courseController.getCourses)
router.get('/id/:id', [], courseController.getCourseById)
router.get('/search/:search',[], courseController.getSearch)
router.get('/featured', [], courseController.getFeaturedCourses)
router.get('/subscription', [], courseController.getCoursesBySubscription)
router.put('/:id', [], courseController.editCourse)
router.post('/', [], courseController.createCourse)
router.delete('/:id', [], courseController.deleteCourse)

module.exports = router;
