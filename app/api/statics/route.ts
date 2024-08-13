import axios from "axios";
import UserModel from "../../(models)/User";
import MoviesModel from "../../(models)/Movies";
import { NextResponse } from "next/server";

export async function GET() {
    const users = await UserModel.countDocuments()
    const movies = await MoviesModel.countDocuments()
    const fiveRecent = await MoviesModel.find().sort({"releaseDate" : -1}).limit(5)
    return NextResponse.json({users : users, movies: movies, fiveRecent : fiveRecent})
}