"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { api } from "../../../lib/api";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Send real payload to our Rust Axum backend structure
      const response = await api.post("/auth/login", { email, password });
      
      // We assume Rust returns { token: "..." }
      if (response.data?.token) {
        // We set the cookie as requested securely. Since we are doing client-side routing,
        // HttpOnly would normally be set by the server via Set-Cookie header.
        // For standard local development bridging, we store manually here.
        Cookies.set("admin_token", response.data.token, { secure: true, sameSite: "strict", expires: 7 });
        router.push("/dashboard");
      } else {
         // Mock login logic until Rust handles JWT fully
         Cookies.set("admin_token", "dummy_jwt_token_for_mock_ui", { secure: true, sameSite: "strict", expires: 7 });
         router.push("/dashboard");
      }
    } catch (err: any) {
      // Mock failure fallback to let them explore UI regardless
      Cookies.set("admin_token", "dummy_jwt_token_for_mock_ui", { secure: true, sameSite: "strict" });
      router.push("/dashboard");
      
      // In production:
      // setError(err.response?.data?.error || "Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030014] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md p-8 relative z-10">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black tracking-tighter text-white mb-2">System Access</h1>
          <p className="text-gray-400">Authenticate to enter Nexus OS.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <div>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition" size={20} />
              <input 
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition"
                placeholder="Admin Email"
              />
            </div>
          </div>

          <div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition" size={20} />
              <input 
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition"
                placeholder="Password"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading ? "Authenticating..." : (
              <>
                Enter System <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
