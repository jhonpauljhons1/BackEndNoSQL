import { JsonWebTokenError } from 'jsonwebtoken';
import User from '../models/Users.js';
import { keyToken } from '../config/constants.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';



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
        res.status(400).json({message: 'invalid user data'});
    }

};
// logica (2)logear nuestra app
export const authenticateUser = async (req, res) => {
    const {email, passsword} = req.body
    const user = await User.findOne({email})

    console.log("USUARIO:"+user)

    console.log(`Contrtaseña: ${password}`)
    console.log(`Contraseña Cifrada guardada en DB::${user.password}`) 

    if (user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user._id,
            name: user.name,
            token: generateToken(user._id)
        })

    }else{
        res.status(400).json({message: 'invalid email or password'});

    }
} 