// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '../../lib/mongodb';
// import Movie from '../../(models)/Movie';
// export async function GET() {
//  await connectToDatabase();
//  const movies = await Movie.find({});
//  const movieCount = await Movie.countDocuments();
//  const topMovies = await Movie.find().sort({ watchCount: -1 }).limit(5);
 
//  return NextResponse.json({
//    movieCount,
//    topMovies,
//    movies,
//  });
// }