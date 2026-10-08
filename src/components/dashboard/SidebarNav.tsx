import React from "react";
import {
  LayoutDashboard,
  Receipt,
  Layers,
  Droplets,
  Send,
  Package,
  Store,
  ShoppingCart,
  MessageSquare,
  Bell,
  Compass,
  UserCheck,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Fish,
  CheckCircle2,
  Plus,
} from "lucide-react";

export type DashboardMenuId =
  | "overview"
  | "expenses"
  | "ponds"
  | "water"
  | "harvests"
  | "catalogue"
  | "procurement"
  | "inquiries"
  | "notifications"
  | "ecosystem50km"
  | "profile";

interface SidebarNavProps {
  activeMenu: DashboardMenuId;
  onSelectMenu: (menu: DashboardMenuId) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  inquiriesCount: number;
  unreadNotifsCount: number;
  userName: string;
  userPhone: string;
  village: string;
  hasFarming: boolean;
  hasSupplier: boolean;
  onSwitchOrAddProfile: () => void;
  onLogout: () => void;
}

export default function SidebarNav({
  activeMenu,
  onSelectMenu,
  isMobileOpen,
  onCloseMobile,
  inquiriesCount,
  unreadNotifsCount,
  userName,
  userPhone,
  village,
  hasFarming,
  hasSupplier,
  onSwitchOrAddProfile,
  onLogout,
}: SidebarNavProps) {
  const handleNav = (menu: DashboardMenuId) => {
    onSelectMenu(menu);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* TradeIndia / B2B Header & User Capsule */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
              <Fish className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 block">
                AgriTrade Portal
              </span>
              <strong className="text-sm font-black text-slate-900 tracking-tight block">
                ModernFisheries
              </strong>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile Card */}
        <div className="p-3.5 mx-3 mt-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-900 truncate max-w-[150px]">
              {userName || "Member"}
            </span>
            <span className="text-[10px] font-mono text-emerald-700 font-bold flex items-center gap-0.5">
              <CheckCircle2 className="w-3 h-3" />
              Verified
            </span>
          </div>
          <div className="text-[11px] text-slate-500 truncate">
            📞 {userPhone} · {village}
          </div>
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {hasFarming && (
              <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-bold">
                Farmer
              </span>
            )}
            {hasSupplier ? (
              <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 text-[10px] font-bold">
                Supplier (50 KM)
              </span>
            ) : (
              <button
                onClick={onSwitchOrAddProfile}
                className="px-2 py-0.5 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-bold cursor-pointer transition-colors"
              >
                + Enable Supplier
              </button>
            )}
          </div>
        </div>

        {/* Navigation Menus List (Categorized like TradeIndia) */}
        <div className="flex-1 overflow-y-auto p-3 space-y-5 text-xs">
          {/* 1. Main Overview */}
          <div>
            <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Overview
            </div>
            <button
              onClick={() => handleNav("overview")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeMenu === "overview"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard Home</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>

          {/* 2. Farm Management */}
          <div className="space-y-1">
            <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Farm Management
            </div>
            <button
              onClick={() => handleNav("expenses")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeMenu === "expenses"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Receipt className="w-4 h-4" />
                <span>Daily Expenses</span>
              </div>
            </button>

            <button
              onClick={() => handleNav("ponds")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeMenu === "ponds"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4" />
                <span>Ponds &amp; Tanks</span>
              </div>
            </button>

            <button
              onClick={() => handleNav("water")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeMenu === "water"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Droplets className="w-4 h-4" />
                <span>Water &amp; Feed FCR</span>
              </div>
            </button>

            <button
              onClick={() => handleNav("harvests")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeMenu === "harvests"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Send className="w-4 h-4" />
                <span>Ready for Harvest</span>
              </div>
            </button>
          </div>

          {/* 3. Catalogue & Supplier (TradeIndia Style) */}
          <div className="space-y-1">
            <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Supplier Commerce
            </div>
            <button
              onClick={() => handleNav("catalogue")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeMenu === "catalogue"
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>B2B Catalogue &amp; Demands</span>
              </div>
            </button>

            <button
              onClick={() => handleNav("procurement")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeMenu === "procurement"
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingCart className="w-4 h-4" />
                <span>Buy Leads (50 KM)</span>
              </div>
            </button>
          </div>

          {/* 4. Leads, Inquiries & Notifications */}
          <div className="space-y-1">
            <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Leads &amp; Alerts
            </div>
            <button
              onClick={() => handleNav("inquiries")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeMenu === "inquiries"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4" />
                <span>Inquiries &amp; Offers</span>
              </div>
              {inquiriesCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                  {inquiriesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNav("notifications")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeMenu === "notifications"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4" />
                <span>Trade Alerts</span>
              </div>
              {unreadNotifsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white animate-pulse">
                  {unreadNotifsCount}
                </span>
              )}
            </button>
          </div>

          {/* 5. Regional Hub & Profile */}
          <div className="space-y-1">
            <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Regional &amp; Account
            </div>
            <button
              onClick={() => handleNav("ecosystem50km")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeMenu === "ecosystem50km"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4" />
                <span>50 KM Regional Hub</span>
              </div>
            </button>

            <button
              onClick={() => handleNav("profile")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeMenu === "profile"
                  ? "bg-slate-800 text-white shadow-xs"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4" />
                <span>My Profile &amp; Roles</span>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Sign-out Action */}
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-red-600 hover:bg-red-50 text-xs font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
