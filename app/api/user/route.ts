import { NextRequest, NextResponse } from "next/server";
import UserModel from "../../(models)/User";
import * as brcypt from 'bcrypt'
import MoviesModel from "../../(models)/Movies";
import mongoose from "mongoose";


export async function GET(req : NextRequest) {
    const searchParams = req.nextUrl.searchParams
    if(!mongoose.Types.ObjectId.isValid(searchParams.get('id')!)){
        return NextResponse.json({error : "User not found"})
    }
    const user = await UserModel.findOne({_id : searchParams.get('id')})
    if(!user) {
        return NextResponse.json({error : "User not found"})
    }
    const movies = await MoviesModel.find({})
    const favoriteMovies : string[] = []
    // Retrieve user and it favorite
    movies.map(movie  => {
        user.favoritesIds.map(favoriteId => {
            if(favoriteId === movie.movieId){
                favoriteMovies.push(movie)
            }
        })
    })
    return NextResponse.json({user : user, favoriteMovies : favoriteMovies})
}


export async function PUT(req : NextRequest) {
    // Get params via url
    const searchParams = req.nextUrl.searchParams
    const user = await UserModel.findById(searchParams.get('id'))
    const body  = await  req.json()
    if(body.oldPassword) {
        if(!await brcypt.compare(body.oldPassword, user.password)) {
            return NextResponse.json({error : 'Old password incorrect'})
        }
    }
    const passwordHash = await brcypt.hash(body.password, await brcypt.genSalt())
    const {_id, oldPassword, ...newUserInfos} = body
    const userInfoToInsert = {
        ...newUserInfos,
        password : passwordHash
    }
    const userUpdated = await UserModel.findByIdAndUpdate(_id, userInfoToInsert)
    return NextResponse.json({success : 'User update successfuly'})
}

// Add movie to user favorites
export async function POST(req:NextRequest) {
    const body = await req.json()
    const getUser = await UserModel.findById(body.userId)
    // Check if user exists
    if(!getUser){
        return NextResponse.json({error : "Please connect first"})
    }
    // Check if movie already favorite
    if(!getUser.favoritesIds.includes(body.movieId)){
        const user = await UserModel.findByIdAndUpdate(body.userId, {
            $push : {favoritesIds : body.movieId}
        })
        console.log(user);
        return NextResponse.json(user)
    }
    console.log('Is already favorite');
    return NextResponse.json({error : 'Is already favorite'})
}

export async function DELETE(req : NextRequest) {
    const params = req.nextUrl.searchParams
    console.log(params);
    const user = await UserModel.findByIdAndUpdate(params.get('userId'), {
        $pull : {favoritesIds : params.get('movieId')}
    })
    console.log(user);
    return NextResponse.json({hello : 'hello'})
}