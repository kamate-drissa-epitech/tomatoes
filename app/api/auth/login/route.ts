import { NextRequest, NextResponse } from "next/server";
import UserModel from "../../../(models)/User";
import * as  bcrypt from 'bcrypt'


export async function POST(req : NextRequest, res : NextResponse){
    try {   
        const body = await req.json()
        const user = await UserModel.findOne({email : body.email})
        
        if (!user) {
            return NextResponse.json({error : 'User not found'})
        }
        if(! await bcrypt.compare(body.password, user.password)) {
            return NextResponse.json({error : 'Password is not correct' })
        }
        return NextResponse.json(user)
        // return NextResponse.json(await req.json())
    } catch (error) {   
        console.log('Error', error);
    }
}