import { NextRequest, NextResponse } from "next/server";
import MoviesModel from "../../(models)/Movies";
import UserModel from "../../(models)/User";

export async function GET(req: NextRequest) {
    const body = req.nextUrl.searchParams
    const movie = await MoviesModel.findById(body.get('id'))
    return NextResponse.json(movie)
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    if (!body.rate || !body.comment) {
        return NextResponse.json({error : 'Please fill the fields'})
    }
    if(!body.userId) {
        return NextResponse.json({error : 'Please login before comment'})
    }

    const user = await UserModel.findOne({_id : body.userId})
    console.log(user);
    
    if(!user) {
        return NextResponse.json({error : 'You need to be connected'})
    }
    const movie = await MoviesModel.findByIdAndUpdate(body.movieId, {
        $push : { impressions : {username : user.username,rate : body.rate,comment :body.comment}}
    })
    console.log(movie);
    return NextResponse.json(body)
    
}