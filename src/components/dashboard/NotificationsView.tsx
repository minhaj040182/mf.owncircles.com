import React from "react";
import {
  Bell,
  CheckCheck,
  AlertTriangle,
  Info,
  Radio,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export interface NotificationItem {
  id: number;
  user_phone: string;
  title: string;
  message: string;
  type: string;
  reference_id?: number;
  is_read: boolean;
  created_at: string;
}

interface NotificationsViewProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectNotification?: (item: NotificationItem) => void;
}

export default function NotificationsView({
  notifications,
  onMarkAllAsRead,
  onSelectNotification,
}: NotificationsViewProps) {
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-slate-200 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              <span>Trade Alerts &amp; Notifications</span>
            </h2>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                {unreadCount} New
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Instant updates on new buyer inquiries, nearby fish harvests, and water parameter alerts.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <CheckCheck className="w-4 h-4 text-slate-600" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
            <Bell className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No Alerts Right Now</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You're all caught up! You'll receive real-time notifications when buyers contact you or harvest deals appear nearby.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNotification && onSelectNotification(item)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                !item.is_read
                  ? "bg-blue-50/60 border-blue-200 hover:border-blue-400"
                  : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  item.type === "inquiry"
                    ? "bg-blue-600 text-white"
                    : item.type === "network"
                    ? "bg-teal-600 text-white"
                    : item.type === "alert"
                    ? "bg-amber-500 text-white"
                    : "bg-slate-700 text-white"
                }`}
              >
                {item.type === "inquiry" ? (
                  <Bell className="w-4 h-4" />
                ) : item.type === "network" ? (
                  <Radio className="w-4 h-4" />
                ) : item.type === "alert" ? (
                  <AlertTriangle className="w-4 h-4" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    {item.title}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.message}
                </p>
              </div>

              {!item.is_read && (
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
