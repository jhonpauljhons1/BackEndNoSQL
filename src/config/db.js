import mongosee from "mongoose"
import { mongoDomain,mongoUser,mongoPWD,mongoDatabase  } from "./constants.js"; 



const connectDB = async () => {
    try{
        await mongosee.connect(mongoDomain+mongoUser+':'+mongoPWD+'@'+mongoDatabase);
        console.log("Conectado a MongoDB Atlas")
    }catch(error){
        console.error(error);
        process.exit(1); // Salir del proceso con error

    }
}

export default connectDB;