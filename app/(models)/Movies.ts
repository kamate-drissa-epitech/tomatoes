import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGO_URI!)
mongoose.Promise = global.Promise

const moviesSchema = new Schema({
    movieId : String,
    title : String,
    genre : [],
    description : String,
    posterImg : String,
    releaseDate : String,
    impressions : [],
    totalRate : {
        type : Number,
        default : 0
    }
})

const MoviesModel = mongoose.models.Movies || mongoose.model('Movies', moviesSchema)

export default MoviesModel