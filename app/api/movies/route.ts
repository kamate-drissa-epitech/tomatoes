import { NextResponse } from "next/server";
import MoviesModel from "../../(models)/Movies";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/movie/${body.movieId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      }
    );
    
    
    const movieToSave = {
      movieId: data.id,
      title: data.title,
      genre: data.genres,
      description: data.overview,
      posterImg: data.poster_path,
      releaseDate: data.release_date,
      impressions: [],
      totalRate: 0,
    };
    console.log(movieToSave);
    const movieAdded = await MoviesModel.create(movieToSave);
    return NextResponse.json(movieAdded);
  } catch (error) {
    console.error("Erreur lors de l'ajout du film:", error);
  }
}
