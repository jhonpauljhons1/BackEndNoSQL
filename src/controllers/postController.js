import post from '../models/posts.js';

// logica (1) recuperar ususarios de mongo con el modelo user

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    }catch (error){
        res.status(500).json({
            message:error.message
        });
    }

}
export const createPost = async (req, res) => {
    const { title, description, userId } = req.body

    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({ message: `El usuario con ID ${userId} no existe` });
    }

    const post = new Post({
        title,
        description,
        user: userId
    })


    try {
        await post.save()
        res.status(200).json({message:'Post creado exitosamente' });
    }catch (error){
        res.status(500).json({
            message:error.message
        });
    }

}