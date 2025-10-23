import Signin from "@/components/Auth/Signin";
import React from "react";
import { getCsrfToken } from "next-auth/react"
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Signin Page | NextCommerce Nextjs E-commerce template",
  description: "This is Signin Page for NextCommerce Template",
  // other metadata
};

const SigninPage = async () => {
  const csrfToken = await getCsrfToken()
  return (
    <div>
         <Signin csrfToken={csrfToken} />
    </div>
  )
};

export default SigninPage;
