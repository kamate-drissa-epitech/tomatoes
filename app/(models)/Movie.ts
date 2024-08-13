import { Schema, model, models } from 'mongoose';
const movieSchema = new Schema({
 title: String,
 description: String,
 duration: String,
 date: Date,
 genre: String,
 publisher: String, // Director
 image: String,
 notes: Number,
});
const Movie = models.Movie || model('Movie', movieSchema);
export default Movie;