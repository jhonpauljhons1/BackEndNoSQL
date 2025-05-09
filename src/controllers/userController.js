import User from '../models/Users.js';

// logica (1) recuperar ususarios de mongo con el modelo user

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    }catch (error){
        res.status(500).json({
            message:error.message
        });
    }

}
export const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save()
        res.status(200).json({message: `Usuario ${user.name} creado exitosamente`});
    }catch (error){
        res.status(500).json({
            message:error.message
        });
    }

}