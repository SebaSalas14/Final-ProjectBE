const express = require('express');
const cors= require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth')

const app = express();
const PORT = process.env.PORT || 5000;
//conexión a la base de datos 
connectDB();
//Se Habilitan request desde cualquier URL
app.use(cors());
//Leer los archivos JSON
app.use(express.json({exetended: true}))

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, ()=> {
    console.log(`Aplicacion corriendo en el puerto ${PORT}`)
})