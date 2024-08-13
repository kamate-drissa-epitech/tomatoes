import { NextRequest, NextResponse } from "next/server";
import UserModel from "../../(models)/User";
import * as bcrypt from 'bcrypt'


// export async function GET() {
//     try {
//         const users = await UserModel.find()
//         return NextResponse.json(users)
//     } catch (error) {
//         console.log("Error " + error);
//     }
// }

// export async function DELETE(req : NextRequest, res: NextResponse) {
//     const searchParams = req.nextUrl.searchParams
//     const userDeleted = await UserModel.findByIdAndDelete(searchParams.get('id'))
//     return NextResponse.json(userDeleted)
// }

// METHODE GET
export async function GET() {
    const user = await UserModel.find()
    return NextResponse.json(user)
}

// METHODE POST
export async function POST(req: NextRequest) {
    const body = await req.json()
    const user = await UserModel.create({...body, password : await bcrypt.hash(body.password, await bcrypt.genSalt()) })
    return NextResponse.json(user)
}

// METHODE DELETE
export async function DELETE(req: any) {
    const {searchParams} = new URL(req.url)
    const id = searchParams.get('id')
    const user = await UserModel.findByIdAndDelete(id)
    return NextResponse.json(user)

}

// METHODE PUT
export async function PUT(req : NextRequest) {
    const body = await req.json()
    const user = await UserModel.create(body)
    return NextResponse.json(user)
}