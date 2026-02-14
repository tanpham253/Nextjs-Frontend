"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

interface LoginData {
  email: string;
  password: string;
}

interface UseLoginOptions {
  callbackUrl?: string;
  csrfToken?: string;
}

export const useLogin = ({ callbackUrl = "/my-account", csrfToken }: UseLoginOptions = {}) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  // Auto-redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  // Main login handler
  const handleLogin = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        csrfToken,
        callbackUrl,
      });

      if (res?.ok) {
        router.push(callbackUrl);
      } else {
        setError("Invalid email or password");
      }
    } catch (err: any) {
      setError(err?.message ?? "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Social login
  const handleSocialLogin = (provider: string) => {
    signIn(provider, { redirect: true, callbackUrl });
  };

  return {
    status,
    isLoading,
    error,
    handleLogin,
    handleSocialLogin,
    setError,
  };
};
