"use client"
import { useState } from "react"


export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(""); // Added to show password mismatch errors
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        setError("") //clears old errors


        if (password !== confirmPassword) {
            setError("Password do not match!");
            return;
        }

        // Start loading only when the API request will begin
    setIsLoading(true);


        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: name,
                    email,
                    password,
                }),
            });

            //parsed the backend response, This converts the backend response into a JavaScript object.
            const data = await response.json();

            if (!response.ok) {
                setError(data.message || data.error || "Registration failed.");
                return;
            }

            console.log("Registration successful:", data);
        } catch (error) {
            console.error("Registration request failed:", error);
            setError("Unable to connect to the server. Please try again.");
        } finally {
            setIsLoading(false);
        }

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

                <label className="text-gray-400 text-sm mb-1">Enter your email:</label>
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

            {error && (
                <p className="text-red-500" role="alert">
                    {error}
                </p>
            )}

            <button 
            type="submit" 
            disabled={isLoading}
            className="w-2xs bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg mt-4 "
            >

                {isLoading ? "Registering..." : "Submit"}
                </button>
        </form>




    )
}
