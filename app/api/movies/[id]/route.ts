// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '../../../lib/mongodb';
// import Movie from '../../../(models)/Movie';
// import { ObjectId } from 'mongodb';
// export async function DELETE(request: Request, { params }: { params: { id: string } }) {
//  await connectToDatabase();
//  try {
//    const { id } = params;
//    const result = await Movie.deleteOne({ _id: new ObjectId(id) });
//    if (result.deletedCount === 1) {
//      return NextResponse.json({ message: 'Film supprimé avec succès.' });
//    } else {
//      return NextResponse.json({ message: 'Film non trouvé.' }, { status: 404 });
//    }
//  } catch (error) {
//    console.error('Erreur lors de la suppression du film:', error);
//    return NextResponse.json({ message: 'Erreur lors de la suppression du film.' }, { status: 500 });
//  }
// }

// export async function PUT(request: Request, { params }: { params: { id: string } }) {
//  await connectToDatabase();
//  try {
//    const { id } = params;
//    const movieData = await request.json();
//    const result = await Movie.updateOne({ _id: new ObjectId(id) }, { $set: movieData });
//    if (result.modifiedCount === 1) {
//      return NextResponse.json({ message: 'Film mis à jour avec succès.' });
//    } else {
//      return NextResponse.json({ message: 'Film non trouvé.' }, { status: 404 });
//    }
//  } catch (error) {
//    console.error('Erreur lors de la mise à jour du film:', error);
//    return NextResponse.json({ message: 'Erreur lors de la mise à jour du film.' }, { status: 500 });
//  }
// }

// export async function POST(request: Request) {
//  await connectToDatabase();
//  try {
//    const movieData = await request.json();
//    const newMovie = new Movie(movieData);
//    await newMovie.save();
//    return NextResponse.json({ message: 'Film ajouté avec succès.', movie: newMovie });
//  } catch (error) {
//    console.error('Erreur lors de l\'ajout du film:', error);
//    return NextResponse.json({ message: 'Erreur lors de l\'ajout du film.' }, { status: 500 });
//  }
// }

