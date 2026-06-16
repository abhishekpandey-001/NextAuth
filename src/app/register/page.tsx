"use client";


import axios from "axios";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter()

  // Handling register api from the next backend

  const handleRegister = async (e:SyntheticEvent<HTMLFormElement>)=>{
    e.preventDefault()

    try {
        const result = await axios.post('/api/auth/register', {name, email, password})

        console.log(result)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <h1 className="text-4xl font-semibold text-white tracking-tight">
            Create account
          </h1>

          <p className="text-zinc-500 mt-3">
            Start building something amazing.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="text-sm text-zinc-400 block mb-2">
              Full Name
            </label>

            <input
              onChange={(e)=>setName(e.target.value)}
              value={name}
              type="text"
              placeholder="John Doe"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-zinc-600 transition"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400 block mb-2">Email</label>

            <input
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="john@example.com"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-zinc-600 transition"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400 block mb-2">Password</label>

            <input
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="••••••••"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-zinc-600 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Create Account
          </button>

          {/* Sign Up with Google option */}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>

            <div className="relative flex justify-center">
              <span className="bg-[#0a0a0a] px-4 text-sm text-zinc-500">
                OR
              </span>
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl py-3 text-white hover:border-zinc-700 transition"
          >
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500 mt-8" onClick={()=>router.push('/login')}>
          Already have an account?{" "}
          <span className="text-white cursor-pointer hover:underline">
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
