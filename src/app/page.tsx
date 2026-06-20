"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

const Page = () => {
  const { data } = useSession();
  const router = useRouter()

  //Signout Logic
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      {/* LOADING STATE */}
      {!data && (
        <div className="flex items-center justify-center min-h-[200px] text-gray-400 text-sm animate-pulse tracking-widest uppercase">
          Loading...
        </div>
      )}
      {data && (
        <div className="w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md p-10 text-white">
          {/* Profile Section */}
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-full bg-amber-300 flex items-center justify-center text-black font-bold text-xl overflow-hidden">
              {data.user.image ? (
                <Image
                  src={data?.user?.image}
                  alt="User Image"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              ) : (
                <span>{data?.user?.name?.charAt(0)}</span>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-semibold">
                Hello, {data.user.name} 👋
              </h2>
              <p className="text-sm text-zinc-400">
                Welcome back to your dashboard
              </p>
            </div>
            {/* Edit section */}
            <CiEdit className="text-white ml-auto size-6 cursor-pointer" onClick={()=>router.push("/edit")}/>
          </div>
          {/* Actions */}
          <div className="mt-10 flex gap-7 items-center">
            <button className="px-5 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 transition">
              View Profile
            </button>
            <button
              className="px-5 py-3 rounded-2xl bg-red-500 hover:bg-red-600 transition text-white"
              onClick={handleSignOut}
            >
              {loading && <div>Signing Out</div>}
              {!loading && <div>Sign Out</div>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
