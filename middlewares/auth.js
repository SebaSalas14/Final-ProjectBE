const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).json({ msg: 'Token no valido' })
    }
    try {
        const encrypt = jwt.verify(token, process.env.SECRET);
        req.user = encrypt.user;
        next();
    } catch(error) {
        console.log(error);
        res.status(401).json({ msg: 'Hubo un error' })
    }
}