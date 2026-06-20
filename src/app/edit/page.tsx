"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

const Page = () => {
  const { data } = useSession();

  const [backendImage, setBackendImage] = useState<File | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBackendImage(file);
  };

  const previewUrl = backendImage
    ? URL.createObjectURL(backendImage)
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Edit Profile
        </h1>

        <form className="flex flex-col gap-8">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-4">
            
            <label htmlFor="profileImage" className="cursor-pointer">
              <div className="h-32 w-32 rounded-full bg-zinc-800 border-2 border-zinc-700 hover:border-amber-300 transition flex items-center justify-center overflow-hidden">

                {/* 1. NEW IMAGE PREVIEW */}
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                ) : data?.user?.image ? (
                  /* 2. BACKEND IMAGE */
                  <Image
                    src={data.user.image}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  /* 3. DEFAULT ICON */
                  <FaUser className="text-5xl text-zinc-400" />
                )}
              </div>
            </label>

            <input
              type="file"
              id="profileImage"
              className="hidden"
              accept="image/*"
              onChange={handleImage}
            />

            <p className="text-sm text-zinc-400">
              Click on the image to change your profile picture
            </p>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-zinc-300">Name</label>

            <input
              type="text"
              defaultValue={data?.user?.name || ""}
              className="rounded-2xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white outline-none focus:border-amber-300"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="rounded-2xl bg-amber-300 py-3 font-semibold text-black hover:bg-amber-200 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;