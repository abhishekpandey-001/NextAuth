"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  // Handling sign in function
  const handleSignIn = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: '/'
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <h1 className="text-4xl font-semibold text-white tracking-tight">
            Welcome back
          </h1>

          <p className="text-zinc-500 mt-3">
            Sign in to continue to your account.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSignIn}>
          <div>
            <label className="block mb-2 text-sm text-zinc-400">Email</label>

            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="john@example.com"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-zinc-600 transition"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-zinc-400">Password</label>

              <button
                type="button"
                className="text-sm text-zinc-500 hover:text-white transition"
              >
                Forgot password?
              </button>
            </div>

            <input
              onChange={(e) => setPassword(e.target.value)}
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
            Sign In
          </button>

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
            onClick={async ()=>{
              await signIn('google', {callbackUrl: '/'})
            }}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl py-3 text-white hover:border-zinc-700 transition"
          >
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500 mt-8">
          Don&apos;t have an account?{" "}
          <span
            className="text-white cursor-pointer hover:underline"
            onClick={() => router.push("/register")}
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
