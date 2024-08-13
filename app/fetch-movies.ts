import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
// import { connectToDatabase } from '../../lib/mongodb';
import Movie from './(models)/Movie';
const API_KEY = process.env.TMDB_API_KEY as string;
const TMDB_API_URL = 'https://api.themoviedb.org/3/movie/popular';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const headers = {
        Authorization: `Bearer ${API_KEY}`,
    };
    const { data } = await axios.get(TMDB_API_URL, {
        headers: headers,
        params: { page: 1 },
    });
    // await connectToDatabase();
    
    const movies = data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        duration: "2h",
        date: movie.release_date,
        genre: movie.genre_ids[0],
        publisher: "Unknown Director",
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        notes: movie.vote_average,
    }));
    await Movie.insertMany(movies);
    res.status(200).json({ message: 'Films insérés avec succès', movies });
}