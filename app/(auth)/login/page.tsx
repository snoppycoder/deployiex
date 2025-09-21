"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const { isLoggedIn, login, logout } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //some api call login(credentials then setisLogin to true)

    // login(email, someCredentials)
    // we will implement it later on
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h1>
            You have been invited! Please insert your organizational email.
          </h1>
          <input
            type="email"
            placeholder="Email Address"
            className="border p-2 rounded-md mt-4 w-80"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
