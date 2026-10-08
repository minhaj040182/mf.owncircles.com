import React, { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, ArrowRight, Loader2, Sparkles, Sprout, Building2, Home, MailCheck, ShieldCheck } from "lucide-react";
import { PageType } from "../utils/seoRouting";

interface ActivationPageProps {
  onNavigate?: (page: PageType) => void;
}

interface ActivatedUser {
  id: number;
  full_name: string;
  phone: string;
  email?: string;
  village: string;
  district: string;
  role?: string;
  is_activated?: boolean | number;
}

export default function ActivationPage({ onNavigate }: ActivationPageProps) {
  const [token, setToken] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already_active" | "error">("idle");
  const [user, setUser] = useState<ActivatedUser | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [manualToken, setManualToken] = useState<string>("");

  useEffect(() => {
    // Extract token from query params: ?token=XXXX
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token") || "";

    if (urlToken) {
      setToken(urlToken);
      activateAccount(urlToken);
    } else {
      setStatus("idle");
    }
  }, []);

  const activateAccount = async (tokenToVerify: string) => {
    if (!tokenToVerify.trim()) {
      setStatus("error");
      setErrorMessage("Please enter a valid activation token.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenToVerify.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        if (data.user) {
          // Persist user to localStorage so Farmer Hub recognizes logged-in user
          localStorage.setItem("mf_farmer_hub_user", JSON.stringify(data.user));
        }

        if (data.alreadyActive) {
          setStatus("already_active");
        } else {
          setStatus("success");
        }
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Activation failed. The link may have expired or is invalid.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred while connecting to the verification server. Please retry.");
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualToken.trim()) {
      setToken(manualToken.trim());
      activateAccount(manualToken.trim());
    }
  };

  const navigateTo = (page: PageType) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.href = page === "home" ? "/" : `/${page}`;
    }
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-6">

        {/* Top Header Badge */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>ModernFisheries Security & Verification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Account Activation
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Verifying your ModernFisheries credentials for full access to the Farmer Hub &amp; local suppliers.
          </p>
        </div>

        {/* LOADING STATE */}
        {status === "loading" && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 text-center space-y-5 animate-pulse">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-black text-slate-900">Activating Your Account...</h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                Please wait while we verify your token and configure your ModernFisheries profile.
              </p>
            </div>
          </div>
        )}

        {/* SUCCESS STATE */}
        {status === "success" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-emerald-200 text-center space-y-6 animate-fade-in">
            {/* Celebration Icon */}
            <div className="relative w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
              <div className="absolute -top-1 -right-1 bg-amber-400 text-amber-950 p-1.5 rounded-full shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                Verified &amp; Active
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Account Successfully Activated!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Welcome, <strong className="text-slate-900 font-bold">{user?.full_name || "Valued Farmer"}</strong>! Your ModernFisheries account is now fully active. You can now complete your setup.
              </p>
            </div>

            {/* User Details Summary Card */}
            {user && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 text-left text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Verified Credentials</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                    <MailCheck className="w-3.5 h-3.5" /> Email Verified
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
                  <div>
                    <span className="block text-[11px] text-slate-400">Full Name</span>
                    <span className="font-bold text-slate-900 text-sm">{user.full_name}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400">Mobile Phone</span>
                    <span className="font-bold text-slate-900 text-sm">{user.phone}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400">Location</span>
                    <span className="font-medium text-slate-800">{user.village}, {user.district}</span>
                  </div>
                  {user.email && (
                    <div>
                      <span className="block text-[11px] text-slate-400">Email Address</span>
                      <span className="font-medium text-slate-800 break-all">{user.email}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Next Steps CTA Buttons */}
            <div className="pt-2 space-y-3">
              <p className="text-xs font-bold text-slate-700">Choose your next step:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => navigateTo("calculators")}
                  className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Sprout className="w-4 h-4" />
                  <span>Explore Calculators Lab</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                </button>

                <button
                  onClick={() => navigateTo("equipment-finder")}
                  className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Explore Equipment Finder</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto text-slate-400" />
                </button>
              </div>

              <button
                onClick={() => navigateTo("home")}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 pt-2 transition-colors cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Homepage</span>
              </button>
            </div>
          </div>
        )}

        {/* ALREADY ACTIVE STATE */}
        {status === "already_active" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-blue-50/50">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                Already Verified
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Your Account is Already Activated!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                Welcome back, <strong>{user?.full_name || "Aquafarmer"}</strong>. Your account has already been verified and is ready for use.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigateTo("home")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Return to Homepage</span>
              </button>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {status === "error" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-rose-200 text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-rose-50/50">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200">
                Activation Notice
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Activation Link Invalid or Expired
              </h2>
              <p className="text-xs sm:text-sm text-rose-700 bg-rose-50 border border-rose-200 p-3 rounded-xl max-w-md mx-auto">
                {errorMessage || "The activation token was not recognized or has already expired."}
              </p>
            </div>

            {/* Manual token input option */}
            <form onSubmit={handleManualSubmit} className="max-w-md mx-auto space-y-3 pt-2">
              <label className="block text-left text-xs font-bold text-slate-700">
                Enter Activation Code Manually
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualToken}
                  onChange={(e) => setManualToken(e.target.value)}
                  placeholder="Paste activation code from your email"
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono"
                />
                <button
                  type="submit"
                  disabled={!manualToken.trim()}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Verify
                </button>
              </div>
            </form>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center text-xs">
              <button
                onClick={() => navigateTo("home")}
                className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all cursor-pointer mx-auto"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        )}

        {/* IDLE STATE (when navigated to /activate without token parameter) */}
        {status === "idle" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
              <MailCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Activate Your Account
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                Check your inbox for the ModernFisheries activation email. Click the button inside the email, or paste your activation token below.
              </p>
            </div>

            <form onSubmit={handleManualSubmit} className="max-w-md mx-auto space-y-3 pt-2">
              <input
                type="text"
                value={manualToken}
                onChange={(e) => setManualToken(e.target.value)}
                placeholder="Enter activation token here"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono text-center"
              />
              <button
                type="submit"
                disabled={!manualToken.trim()}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer"
              >
                Verify &amp; Activate Account
              </button>
            </form>

            <div className="pt-2">
              <button
                onClick={() => navigateTo("home")}
                className="text-xs text-blue-600 hover:underline font-bold"
              >
                Return to Homepage &rarr;
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
