"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

const Login = () => {
  const { data: session, status } = useSession();
  const user = session?.user as any;
  const isSignedIn = status === "authenticated";

  return (
    <div className="bg-white shadow-1 rounded-[10px]">
      <div className={`flex items-center gap-0.5 py-5 px-5.5`}>
        {isSignedIn ? (
          <p className="font-medium text-dark">
            Welcome back,{" "}
            <span className="text-blue font-semibold">
              {user?.name || "User"}
            </span>
            !
          </p>
        ) : (
          <p className="flex items-center gap-1 text-dark">
            Returning customer?
            <Link
              className="flex items-center gap-2.5 pl-1 font-medium text-dark"
              href="/signin"
            >
              Click here to login
            </Link>
          </p>
        )}
      </div>

      {/* <!-- dropdown menu -->
      <div
        className={`${
          dropdown ? "block" : "hidden"
        } pt-7.5 pb-8.5 px-4 sm:px-8.5`}
      >
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2.5">
            Username or Email
          </label>

          <input
            type="text"
            name="name"
            id="name"
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2.5">
            Password
          </label>

          <input
            type="password"
            name="password"
            id="password"
            autoComplete="on"
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>

        <button
          type="submit"
          className="inline-flex font-medium text-white bg-blue py-3 px-10.5 rounded-md ease-out duration-200 hover:bg-blue-dark"
        >
          Login
        </button>
      </div> */}
    </div>
  );
};

export default Login;
