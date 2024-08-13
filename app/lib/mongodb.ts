import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
 throw new Error('Veuillez définir la variable MONGODB_URI dans votre fichier .env');
}
export async function connectToDatabase() {
 if(mongoose.connections[0].readyState) return;
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("Mongo Connection successfuly.");
    } catch (error) {
        console.log(error);
        
    }
}