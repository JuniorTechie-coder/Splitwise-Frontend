
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!email.trim() || !password.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        if (!email.includes("@")) {
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
                        email: email.trim(),
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message ||
                    data.error ||
                    "Login failed. Please try again."
                );
                return;
            }

            if (typeof data.accessToken !== "string") {
                setError("The server did not return an access token.");
                return;
            }

            sessionStorage.setItem("accessToken", data.accessToken);
            setSuccess("Login successful!");

        } catch (error) {
            console.error("Login request failed:", error);
            setError("Unable to connect to the server. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#f7faf8] flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-md">

                {/* Logo and branding */}
                <Link href="/" className="flex justify-center items-center gap-2 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-xl">
                        S
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                        Split<span className="text-emerald-600">wise</span>
                    </span>
                </Link>

                {/* Login card */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-7 sm:p-9">

                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Welcome back
                        </h1>
                        <p className="text-gray-500 text-sm mt-2">
                            Sign in to manage your expenses and groups.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email address
                            </label>

                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    className="w-full px-4 py-3 pr-20 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-emerald-700 hover:text-emerald-800"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                                {error}
                            </p>
                        )}

                        {success && (
                            <p role="status" className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
                                {success}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition shadow-sm"
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </button>

                    </form>

                    <div className="mt-7 text-center text-sm text-gray-500">
                       Don&apos;t have an account?{" "}
                        <Link href="/register" className="font-semibold text-emerald-700 hover:text-emerald-800">
                            Create account
                        </Link>
                    </div>

                </div>

                <p className="text-center text-xs text-gray-400 mt-6">
                    Split expenses. Stay friends.
                </p>

            </div>
        </main>
    );
}
