import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/usermodel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()


export async function POST(request: NextRequest) {

    try {

        const reqBody = await request.json()
        console.log("reqBody:", reqBody);

        const { email, password } = reqBody;


        // validation

        const user = await User.findOne({ email })
        console.log("user:", user);


        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }

        console.log("User exist");

        const validPassword = await bcryptjs.compare(password, user.password)
        console.log("validPassword:", validPassword);

        if (!validPassword) {
            return NextResponse.json({ error: "Check your credentials" }, { status: 400 })
        }


        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }


        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })


        console.log("token:", token);



        const response = NextResponse.json({
            message: "Logged In Success",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response




    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}