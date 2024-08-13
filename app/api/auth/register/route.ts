import { NextRequest, NextResponse } from "next/server";
import UserModel from "../../../(models)/User";
import * as  bcrypt from 'bcrypt'


export async function POST(req : NextRequest, res : NextResponse){
    try {   
        const body = await req.json()
        const user = await UserModel.findOne({email : body.email})
        if(user) {
            return NextResponse.json({error : 'User already exists'})
        }
        const passwordHash = await bcrypt.hash(body.password, await bcrypt.genSalt())
        const userCreated = await UserModel.create({...body, password : passwordHash })
        return NextResponse.json(userCreated)
        // return NextResponse.json(await req.json())
    } catch (error) {   
        console.log('Error', error);
    }
}