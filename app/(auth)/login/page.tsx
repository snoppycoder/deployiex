"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { Eye, EyeOff, TrendingUp } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn, login, logout } = useAuthContext();
  const router = useRouter();

  const schema = z.object({
    email: z.string().email(),
  });

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = schema.safeParse({ email });
    if (!res.success) {
      alert("Please enter a valid email address.");
      return;
    }
    //some api call login(credentials) then setisLogin to true)

    // login(email, someCredentials)
    // we will implement it later on
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg *:shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-8 border border-gray-300 rounded-lg  "
        >
          <div className="p-4 flex mb-4  justify-center">
            <TrendingUp size={28} className="mr-2.5" />
            <span className="font-bold text-xl">IEX Tracker</span>
          </div>
          <h1 className="font-semibold ">
            You have been invited! Please insert your organizational email.
          </h1>

          <input
            type="email"
            placeholder="Email Address"
            className="border mt-4  border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-md outline-none w-full transition-all pr-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative mt-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-md outline-none w-full transition-all pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button
            type="submit"
            className="mt-4 bg-black text-white p-2 rounded-md cursor-pointer font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
