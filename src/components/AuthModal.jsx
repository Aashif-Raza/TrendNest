import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Icon from "./Icon";

// Professional blue-gray gradient for border
const BG_GRADIENT = "bg-gradient-to-br from-blue-700 via-gray-200 to-gray-100";
const ICONS = {
  name: "fa-user",
  email: "fa-envelope",
  password: "fa-lock",
};

export default function AuthModal({ open, onClose }) {
  const { login, register, socialLogin } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setProcessing(true);
    let res;
    if (isLogin) {
      res = await login(form.email, form.password);
      if (!res.success) setError(res.message);
      else onClose();
    } else {
      if (!form.name.trim()) {
        setError("Name required");
        setProcessing(false);
        return;
      }
      res = await register(form.name, form.email, form.password);
      if (!res.success) setError(res.message);
      else onClose();
    }
    setProcessing(false);
  }

  async function handleSocial(provider) {
    setProcessing(true);
    setError("");
    const res = await socialLogin(provider);
    if (!res.success) setError(res.message);
    else onClose();
    setProcessing(false);
  }

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      aria-modal="true"
      tabIndex={-1}
    >
      <div
        className="relative w-full max-w-md mx-auto outline-none"
        tabIndex={0}
        style={{ animation: "modalIn 0.5s cubic-bezier(.5,1.5,.5,1) both" }}
      >
        {/* Animated Gradient Border */}
        <div className="absolute -inset-1 rounded-2xl blur-md opacity-90 pointer-events-none animate-gradient-move z-0">
          <div className={`${BG_GRADIENT} w-full h-full rounded-2xl`} />
        </div>
        {/* Glassmorphism Card */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl px-8 py-10 md:px-10 flex flex-col items-center z-10 overflow-hidden border border-white/30 transition-all duration-300">
          {/* Close Button */}
          <button
            className="absolute top-3 right-4 btn-icon text-[#5B3A29] hover:text-gray-500 transition"
            onClick={onClose}
            aria-label="Close"
          >
            <Icon name="close" size="large" />
          </button>
          {/* Icon */}
          <div className="mb-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5B3A29] to-[#3a2518] flex items-center justify-center shadow-lg border-4 border-white/60">
              <Icon
                name={isLogin ? "login" : "userPlus"}
                size="large"
                className="text-white"
              />
            </div>
          </div>
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-gray-600 mb-2 tracking-wide drop-shadow">
            {isLogin ? "Sign In" : "Create Account"}
          </h2>
          <p className="text-gray-600 mb-6 text-sm text-center max-w-xs">
            {isLogin
              ? "Sign in to continue your shopping."
              : "Join us and start your shopping journey!"}
          </p>
          {/* Social login */}
          <div className="w-full flex flex-col gap-2 mb-4">
            <button
              type="button"
              onClick={() => handleSocial("google")}
              disabled={processing}
              className="flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg py-2 font-semibold text-gray-700 shadow-sm hover:bg-gray-100 transition active:scale-[0.97]"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => handleSocial("facebook")}
              disabled={processing}
              className="flex items-center justify-center gap-3 bg-blue-700 border border-blue-800 rounded-lg py-2 font-semibold text-white shadow-sm hover:bg-blue-800 transition active:scale-[0.97]"
            >
              <Icon name="facebook" size="medium" />
              Continue with Facebook
            </button>
          </div>
          {/* Or line */}
          <div className="flex items-center w-full gap-2 my-3">
            <hr className="flex-1 border-gray-200" />
            <span className="text-gray-400 text-xs font-semibold">or</span>
            <hr className="flex-1 border-gray-200" />
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4"
            autoComplete="on"
          >
            {!isLogin && (
              <div className="relative">
                <label className="block text-xs font-semibold mb-1 text-gray-700">
                  Name
                </label>
                <span className="absolute left-3 top-8 text-gray-400 pointer-events-none">
                  <Icon name="user" size="small" />
                </span>
                <input
                  name="name"
                  placeholder="Your name"
                  className="w-full border border-gray-300 rounded-lg px-9 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-800 bg-white/90"
                  value={form.name}
                  onChange={handleChange}
                  required
                  disabled={processing}
                  autoFocus
                />
              </div>
            )}
            <div className="relative">
              <label className="block text-xs font-semibold mb-1 text-gray-700">
                Email
              </label>
              <span className="absolute left-3 top-8 text-gray-400 pointer-events-none">
                <Icon name="mail" size="small" />
              </span>
              <input
                name="email"
                placeholder="email@domain.com"
                className="w-full border border-gray-300 rounded-lg px-9 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-800 bg-white/90"
                value={form.email}
                onChange={handleChange}
                type="email"
                required
                disabled={processing}
                autoFocus={isLogin}
              />
            </div>
            <div className="relative">
              <label className="block text-xs font-semibold mb-1 text-gray-700">
                Password
              </label>
              <span className="absolute left-3 top-8 text-gray-400 pointer-events-none">
                <Icon name="lock" size="small" />
              </span>
              <input
                name="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-9 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-800 bg-white/90"
                value={form.password}
                onChange={handleChange}
                type="password"
                required
                disabled={processing}
              />
            </div>
            {error && (
              <div className="w-full text-red-500 text-sm rounded bg-red-50 px-3 py-2 mb-1 text-center border border-red-100 animate-shake">
                <Icon name="error" size="small" className="inline mr-2" />
                {error}
              </div>
            )}
            <button
              className={`w-full py-2 rounded-lg font-bold shadow transition text-lg text-white btn-primary ${processing ? "opacity-70 cursor-wait" : ""} active:scale-[0.97]`}
              type="submit"
              disabled={processing}
              aria-busy={processing}
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-70" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  {isLogin ? "Signing in..." : "Signing up..."}
                </span>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-center gap-1 text-sm">
            {isLogin ? (
              <>
                <span>Don't have an account?</span>
                <button
                  className="text-blue-700 font-bold underline-offset-2 underline hover:text-gray-700 transition"
                  onClick={() => {
                    setIsLogin(false);
                    setForm({ name: "", email: "", password: "" });
                    setError("");
                  }}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <span>Already have an account?</span>
                <button
                  className="text-blue-700 font-bold underline-offset-2 underline hover:text-gray-700 transition"
                  onClick={() => {
                    setIsLogin(true);
                    setForm({ name: "", email: "", password: "" });
                    setError("");
                  }}
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Animations & gradient */}
      <style>{`
        @keyframes gradient-move {
          0%,100% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
        }
        .animate-gradient-move {
          animation: gradient-move 5s ease-in-out infinite alternate;
          background-size: 200% 200%;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px);}
          40%, 80% { transform: translateX(8px);}
        }
        .animate-shake { animation: shake 0.4s; }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(40px) scale(.97);}
          to   { opacity: 1; transform: none;}
        }
      `}</style>
    </div>
  );
}