"use client"
import {useState} from "react"

export default function LoginPage(){
const[email, setEmail] = useState("");
const[password, setPassword] = useState("");
const[error, setError] = useState(""); // Added to show password mismatch errors
const[success, setSuccess] = useState("");
const[isLoading, setIsLoading] = useState(false);


 async function handleSubmit(e: React.SyntheticEvent){
    e.preventDefault();
    setError("");
    setSuccess("");

    // 1. Frontend Validation: Check if inputs are empty
    if(!email.trim || !password.trim){
        setError("Please fill empty fields.");
        return;
    }

     if(!email.includes("@")) {
        setError("Please enter a valid email address.");
        return;
     }

     try {
        setIsLoading(true);

        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            }
        );
        const data = await response.json();

        if(!response.ok){
            setError(
                data.message ||
                data.error ||
                "Login failed. Please try again."
            );
            return;
        }

        if(typeof data.accessToken !== "string"){
            setError("The server did not return an access token.");
            return;
        }

        // Temporary storage for our learning project.
        sessionStorage.setItem("accessToken", data.accessToken);

        setSuccess("Login successfull");
        
    } catch  (error) {
      console.error("Login request failed:", error);
        setError("Unable to connect to the server. Please try again.");
    } finally {
        setIsLoading(false);
    }
  
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

    <button type="submit" 
    disabled={isLoading}
    className="w-2xs bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg mt-4 ">
         {isLoading ? "Logging in..." : "Login"}
    </button>
    

    {error && <p className="text-red-500">{error}</p>}
{success && <p className="text-green-500">{success}</p>}

    </form>
    
) 
}