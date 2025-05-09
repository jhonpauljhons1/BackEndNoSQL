import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
},
email:{
    type: String,
    required: true,
    unique: true,
    match: /^\w+([.-]?\w+)@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  password:{
    type: String,
    required: true,
  },
});
// funcion para hasear( tranformar la conmtraseña a un textoilegible)
//antes de guardar el valor real de la contraseña en MongoDB
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 12);
        next();
    
});

const User = mongoose.model("User", userSchema);
export default User;