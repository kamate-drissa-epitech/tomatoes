import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGO_URI!)
mongoose.Promise = global.Promise

const userSchema = new Schema({
    username : String,
    email : String,
    password : String,
    isAdmin : {
        type : Boolean,
        default : false
    },
    favoritesIds : []
})

const UserModel = mongoose.models.Users || mongoose.model('Users', userSchema)

export default UserModel