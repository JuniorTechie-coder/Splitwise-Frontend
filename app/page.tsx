"use client"
import Link from 'next/link';

export default function home() {
   return  (
      <main className="min-h-screen w-full bg-gray-950 flex items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center bg-gray-900 p-8 rounded-xl shadow-lg w-96 gap-4">
            <h1 className="text-4xl font-bold text-white">Splitwise</h1>
          <p className="text-gray-500">Split expenses with friends, simplified!</p>
       
          <Link href="/login">
            <button className="bg-blue-500 mt-4 px-6 py-2 rounded-lg">Login</button>
          </Link>
          
          <Link href="/register">
            <button className="border-4 mt-4 px-6 py-2 rounded-lg ">Registration</button>
          </Link>
        </div>
          
         
      </main>
   )
}
