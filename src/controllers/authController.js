import User from '../models/Users.js';
import { keyToken } from '../config/constants.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';



const generateToken = (id) => {
    return jwt.sign({ id }, keyToken, {expiresIn: '30d'});
}
// logica (1) recuperar ususarios de mongo con el modelo user

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const user = await User.create({ name, email, password });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                tokenAccess: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Datos inválidos del usuario' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

// logica (2)logear nuestra app
export const authenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Correo o contraseña inválidos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};
