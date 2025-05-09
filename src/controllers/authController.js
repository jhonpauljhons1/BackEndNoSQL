import { JsonWebTokenError } from 'jsonwebtoken';
import User from '../models/Users.js';
import { keyToken } from '../config/constants.js';
import jwt from 'jsonwebtoken';


const generateToken = (id) => {
    return jwt.sign({ id }, keyToken, {expiresIn: '30d'});
}
// logica (1) recuperar ususarios de mongo con el modelo user



export const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email });   
    if (userExists){
        res.status(400).json({message: 'El usuario ya existe'})
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            tokenAccess: generateToken(user._id)
        });
    }else{
        res.status(400).json({message: 'invalñid user data'})
    }
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