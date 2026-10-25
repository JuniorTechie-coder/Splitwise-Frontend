"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const [userId, setUserId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken");

        if (!accessToken) {
            router.replace("/login");
            return;
        }

         
        async function fetchUser() {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/auth/me",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                if (response.status === 401) {
                    sessionStorage.removeItem("accessToken");
                    router.replace("/login");
                    return;
                }

                const data = await response.json();

                if (!response.ok) {
                    setError(data.message || "Failed to load user data.");
                    return;
                }

                setUserId(data.userId);
            } catch (requestError) {
                console.error("Dashboard request failed:", requestError);
                setError("Unable to connect to the server.");
            } finally {
                setIsLoading(false);
            }
        }


        fetchUser();
    }, [router]);

    function handleLogout(){
            sessionStorage.removeItem("accessToken");
            router.replace("/login");
        }


    return (
        <main className="min-h-screen bg-gray-950 p-8 text-white">
            <h1 className="text-3xl font-bold">Welcome to Splitwise</h1>

            {isLoading && <p className="mt-4">Loading dashboard...</p>}

            {error && (
                <p className="mt-4 text-red-500" role="alert">
                    {error}
                </p>
            )}

            {!isLoading && !error && userId !== null && (
                <p className="mt-4">Your user ID is: {userId}</p>
            )}

            <button
            onClick={handleLogout}
                className="mt-6 rounded-lg bg-gray-600 px-4 py-2 text-gray-300"
            >
                Logout
            </button>
        </main>
    );
}
