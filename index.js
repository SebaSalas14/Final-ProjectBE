const express = require('express');
const cors= require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
//Se Habilitan request desde cualquier URL
app.use(cors());

app.listen(PORT, ()=> {
    console.log(`Aplicacion corriendo en el puerto ${PORT}`)
})