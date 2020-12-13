const Comments = require('../models/Comments');

exports.getAllComments = async (req,res) => {
    try {
        const comments = await Comments.find({});
        res.json(comments);
        res.status(200).json({msg: 'Comentarios traidos correctamente'})
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error' })
    }
    res.end();
}

exports.addComment = async (req,res) => {
    const comment = new Comments(req.body);
    try {
          await comment.save();
          res.status(200).json({msg: 'Comentario creado'})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' })
    }
    res.end();
}