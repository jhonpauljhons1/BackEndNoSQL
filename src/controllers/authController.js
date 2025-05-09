import { JsonWebTokenError } from 'jsonwebtoken';
import User from '../models/Users.js';


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}
// logica (1) recuperar ususarios de mongo con el modelo user



export const registerUser = async (req, res) => {
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