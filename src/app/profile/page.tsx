'use client'
import React, { useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {

    const router = useRouter()
    const [data, setData] = useState("nothing")


    const getuserDetails = async () => {
        try {
            const res = await axios.post("api/users/me")
            // console.log(res.data)
            setData(res.data.data._id)
        } catch (error: any) {
            console.log("error:", error);
            toast.error(error.message)

        }
    }

    const onLogout = async () => {
        try {

            const response = await axios.get("/api/users/logout")
            toast.success("logout success")
            console.log("Logout success:", response.data);
            router.push("/login")



        } catch (error: any) {
            console.log("Login failed");
            console.log(error.message);
            toast.error(error.message)

        }
    }

    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <h1 className='text-4xl text-purple-600 text'>
                Profile Page
            </h1>
            <h2>
                {
                    (data === "nothing")
                        ?
                        "Nothing"
                        :
                        (
                            <Link href={`/profile/${data}`}>
                                {data}
                            </Link>)
                }
            </h2>
            <hr />
            <button
                onClick={onLogout}
                className='bg-slate-400 p-3 rounded-xl text-white mt-4'>
                Logout
            </button>
            <button
                onClick={getuserDetails}
                className='bg-green-600 p-3 rounded-xl text-white mt-4'>
                Get User Details
            </button>
        </div>
    )
}
