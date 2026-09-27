"use client"
import { useState } from "react"


export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(""); // Added to show password mismatch errors

    function handleSubmit(e: React.SyntheticEvent){
    e.preventDefault();
    setError("") //clears old errors
    

    if(password !== confirmPassword){
        setError("Password do not match!");
        return;
    }

    console.log(`Name: ${name} Email: ${email} Password: ${password}`)

    }


    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen gap-4">
            <div>
                <label className="text-gray-400 text-sm mb-1">Enter your name:</label>
                <input type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg outline-none"
                />

                <label className="text-gray-400 text-sm mb-1">Enter your name:</label>
                <input type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg outline-none"
                />

                <label>Enter your password:</label>
                <input type="password"
                    placeholder="your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg outline-none"
                />

                <label>Confirm Password:</label>
                <input type="password"
                placeholder="your password!"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg outline-none"
                />


            </div>

            <button type="submit" className="w-2xs bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg mt-4 ">Submit</button>
        </form>




    )
}