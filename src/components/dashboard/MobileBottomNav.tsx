import React from "react";
import {
  LayoutDashboard,
  Receipt,
  Package,
  MessageSquare,
  Menu,
} from "lucide-react";
import { DashboardMenuId } from "./SidebarNav";

interface MobileBottomNavProps {
  activeMenu: DashboardMenuId;
  onSelectMenu: (menu: DashboardMenuId) => void;
  onOpenMobileSidebar: () => void;
  inquiriesCount: number;
}

export default function MobileBottomNav({
  activeMenu,
  onSelectMenu,
  onOpenMobileSidebar,
  inquiriesCount,
}: MobileBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around lg:hidden shadow-lg">
      <button
        onClick={() => onSelectMenu("overview")}
        className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg cursor-pointer ${
          activeMenu === "overview" ? "text-blue-600 font-bold" : "text-slate-500"
        }`}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-[10px]">Home</span>
      </button>

      <button
        onClick={() => onSelectMenu("expenses")}
        className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg cursor-pointer ${
          activeMenu === "expenses" ? "text-emerald-600 font-bold" : "text-slate-500"
        }`}
      >
        <Receipt className="w-5 h-5" />
        <span className="text-[10px]">Expenses</span>
      </button>

      <button
        onClick={() => onSelectMenu("catalogue")}
        className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg cursor-pointer ${
          activeMenu === "catalogue" ? "text-teal-600 font-bold" : "text-slate-500"
        }`}
      >
        <Package className="w-5 h-5" />
        <span className="text-[10px]">Catalogue</span>
      </button>

      <button
        onClick={() => onSelectMenu("inquiries")}
        className={`relative flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg cursor-pointer ${
          activeMenu === "inquiries" ? "text-blue-600 font-bold" : "text-slate-500"
        }`}
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-[10px]">Inquiries</span>
        {inquiriesCount > 0 && (
          <span className="absolute top-0 right-1 w-4 h-4 bg-amber-500 text-white rounded-full text-[9px] font-black flex items-center justify-center">
            {inquiriesCount}
          </span>
        )}
      </button>

      <button
        onClick={onOpenMobileSidebar}
        className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-slate-700 hover:text-blue-600 cursor-pointer"
      >
        <Menu className="w-5 h-5" />
        <span className="text-[10px]">All Menus</span>
      </button>
    </nav>
  );
}
