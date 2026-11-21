"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const [userId, setUserId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch("/api/auth/me", {
                    method: "GET",
                    credentials: "include",
                });

                if (response.status === 401) {
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

    async function handleLogout() {
        setIsLoggingOut(true);
        setError("");

        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                router.replace("/login");
                router.refresh();
                return;
            }

            setError("Unable to log out. Please try again.");
        } catch (requestError) {
            console.error("Logout request failed:", requestError);
            setError("Unable to connect to the server. Please try again.");
        } finally {
            setIsLoggingOut(false);
        }
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
                disabled={isLoggingOut}
                className="mt-6 rounded-lg bg-gray-600 px-4 py-2 text-gray-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
        </main>
    );
}
