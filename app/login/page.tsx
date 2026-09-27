"use client"
import {useState} from "react"

export default function LoginPage(){
const[email, setEmail] = useState("");
const[password, setPassword] = useState("");
const [error, setError] = useState(""); // Added to show password mismatch errors


function handleSubmit(e: React.SyntheticEvent){
    e.preventDefault();
    setError("");

    // 3. Frontend Validation: Check if inputs are empty
    if(!email.trim || !password.trim){
        setError("Please fill empty fields.");
        return;
    }

     // 4. Frontend Validation: Basic email formatting check
     if(!email.includes("@")) {
        setError("Please enter a valid email address.");
        return;
     }


    console.log(`Email: ${email} Password: ${password} `);

}

return(

    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div>
        <h1>Login Page</h1>
    
    <label className="text-gray-400 text-sm mb-1">Enter your Email:</label>
    <input type = "email" 
    placeholder="xyz@gmail.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg outline-none"
    />

    <label className="text-gray-400 text-sm mb-1">Enter your password:</label>
    <input type = "text"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
     className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg outline-none"
      />

    </div>

    <button type="submit" className="w-2xs bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg mt-4 ">Submit</button>
    
    </form>
    
) 
}