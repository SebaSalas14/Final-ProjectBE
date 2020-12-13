const express = require('express');
const cors= require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/users');
const coursesRoutes = require('./routes/courses');
const authRoutes = require('./routes/auth');
const commentsRoutes = require('./routes/comments');

const app = express();
const PORT = process.env.PORT || 4000;
//conexión a la base de datos 
connectDB();
//Se Habilitan request desde cualquier URL
app.use(cors());
//Leer los archivos JSON
app.use(express.json({extended: true}))

app.use('/api/users', userRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentsRoutes);

app.listen(PORT, ()=> {
    console.log(`Aplicacion corriendo en el puerto ${PORT}`)
})