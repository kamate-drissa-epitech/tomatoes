import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import MoviesModel from "../../(models)/Movies";
import * as bcrypt from 'bcrypt'
import UserModel from "../../(models)/User";

export async function GET() {
// Fetch movie to fill our DB

  // const { data } = await axios.get(
  //   "https://api.themoviedb.org/3/movie/upcoming",
  //   {
  //     headers: {
  //       Authorization: `Bearer ${process.env.TOKEN}`,
  //     },
  //   }
  // );
  // const moves = await data.results;
  // moves.map(async (movie) => {
  //   await MoviesModel.create({
  //     movieId: movie.id,
  //     title: movie.title,
  //     genreIds: [movie.genre_ids],
  //     description: movie.overview,
  //     posterImg: movie.poster_path,
  //     releaseDate: movie.release_date,
  //     impressions : [],
  //     totalRate : 0

  //   });
  // });

  //Create an admin
  // const user = await UserModel.create({
  //   username : 'kone',
  //   email : 'kone@gmail.com',
  //   password : await bcrypt.hash('kone', await bcrypt.genSalt()),
  //   isAdmin : true,
  //   favoritesIds : []
  // })
  // console.log(user);
  

  const movies = await MoviesModel.find({})
  
  
  return NextResponse.json(movies);
}


export async function POST(req : NextRequest) {
  // const body = await req.json();
  // const movies = await MoviesModel.find()
  // const moviesFiltered = movies.filter(movie => {
  //   return movie.releaseDate.includes(body.query)
  // })
  // console.log(moviesFiltered);
  
  // const movies = await  MoviesModel.find({})
}
