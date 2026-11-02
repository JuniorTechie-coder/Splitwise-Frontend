
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        if (
            !name.trim() ||
            !email.trim() ||
            !password ||
            !confirmPassword
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setIsLoading(true);

            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    username: name.trim(),
                    email: email.trim(),
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message ||
                    data.error ||
                    "Registration failed. Please try again."
                );
                return;
            }

            router.replace("/login?registered=true");

        } catch (error) {
            console.error("Registration request failed:", error);
            setError("Unable to connect to the server. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#f7faf8] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">

                <Link href="/" className="flex justify-center items-center gap-2 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-xl">
                        S
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                        Split<span className="text-emerald-600">wise</span>
                    </span>
                </Link>

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-7 sm:p-9">

                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Create your account
                        </h1>
                        <p className="text-gray-500 text-sm mt-2">
                            Start sharing expenses with your friends.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                autoComplete="name"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                autoComplete="email"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a password"
                                    autoComplete="new-password"
                                    className="w-full px-4 py-3 pr-20 rounded-xl border border-gray-300 text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-emerald-700"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                autoComplete="new-password"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        {error && (
                            <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition"
                        >
                            {isLoading ? "Creating account..." : "Create account"}
                        </button>

                    </form>

                    <div className="mt-7 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-emerald-700">
                            Sign in
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
