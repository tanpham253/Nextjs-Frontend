"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Signup = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Check unique email
  const checkEmail = async (email: string) => {
    if (!email) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/customers/check-email?email=${email}`
      );
      const data = await res.json();
      if (data.exists) {
        setEmailError("Email already exists");
      } else {
        setEmailError("");
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (emailError) return;
    if (form.password !== form.confirm_password) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/customers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      setMessage("Account created successfully!");
      await autoLogin(form.email, form.password);
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
      });
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  const autoLogin = async (email: string, password: string) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/my-account",
      });

      if (result?.ok) {
        router.push("/my-account");
      } else {
        setMessage(
          "Account created, but auto-login failed. Please sign in manually."
        );
      }
    } catch (error) {
      console.error("Auto-login error:", error);
      setMessage("Account created, but could not log you in automatically.");
    }
  };

  return (
    <>
      <Breadcrumb title="Signup" pages={["Signup"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Create an Account
              </h2>
              <p>Enter your details below</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label htmlFor="first_name" className="block mb-2.5">
                    First Name <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="First name"
                    value={form.first_name}
                    onChange={handleChange}
                    required
                    className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5 outline-none focus:ring-2 focus:ring-blue/20"
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="block mb-2.5">
                    Last Name <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Last name"
                    value={form.last_name}
                    onChange={handleChange}
                    required
                    className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5 outline-none focus:ring-2 focus:ring-blue/20"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-5">
                <label htmlFor="email" className="block mb-2.5">
                  Email Address <span className="text-red">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email address"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={() => checkEmail(form.email)}
                  required
                  className={`rounded-lg border ${
                    emailError ? "border-red" : "border-gray-3"
                  } bg-gray-1 w-full py-3 px-5 outline-none focus:ring-2 focus:ring-blue/20`}
                />
                {emailError && (
                  <p className="text-red text-sm mt-1">{emailError}</p>
                )}
              </div>

              {/* Password */}
              <div className="mb-5">
                <label htmlFor="password" className="block mb-2.5">
                  Password <span className="text-red">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5 outline-none focus:ring-2 focus:ring-blue/20"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="confirm_password" className="block mb-2.5">
                  Confirm Password <span className="text-red">*</span>
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="Re-type your password"
                  value={form.confirm_password}
                  onChange={handleChange}
                  required
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5 outline-none focus:ring-2 focus:ring-blue/20"
                />
              </div>

              {message && (
                <p className="text-center text-sm text-red mt-2">{message}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg hover:bg-blue mt-7.5 disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <p className="text-center mt-6">
                Already have an account?
                <Link href="/signin" className="text-dark hover:text-blue pl-2">
                  Sign in Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
