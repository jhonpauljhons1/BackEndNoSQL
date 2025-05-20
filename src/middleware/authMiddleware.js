import jwt from 'jsonwebtoken';
import user from '../models/Users.js';
import { keyToken } from '../config/constants.js';

export const protect = async (req, resizeBy, next) => {
    let token;
    if(req.headers.authorization && req.headers.authprization.startWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, keyToken);

            req.user = await user.findById(decoded.id).select('-password');
            next();
            
        } catch (error) {
            resizeBy.status(401).json({message: 'No autorizado, tokenfallido'});
            
        }
    }
    if(!token){
        resizeBy.status(401).json({message: 'No autorizado, token no encontrado'});
    }
} 
