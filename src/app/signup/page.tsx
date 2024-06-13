'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function SignupPage() {

    const router = useRouter()

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)


    const onSignup = async () => {
        try {
            setLoading(true)

            const response = await axios.post("/api/users/signup", user)

            console.log("Signup success:", response.data);
            router.push('/login')



        } catch (error: any) {
            setLoading(false)
            console.log("Signup failed");
            toast.error(error.message)
        }
    }


    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div>signup page</div>
    )
}
