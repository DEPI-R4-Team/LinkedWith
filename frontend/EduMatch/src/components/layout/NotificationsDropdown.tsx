import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  BookOpenCheck,
  CheckCheck,
  CircleDollarSign,
  ClipboardList,
  FileText,
  MessageSquareQuote,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getMyNotifications,
  getUnreadCount,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/services/notifications.service";
import type { Notification, NotificationType } from "@/types/notification";

const POLL_INTERVAL_MS = 30_000;

const typeIcons: Partial<Record<NotificationType, typeof Bell>> = {
  application_received: FileText,
  application_accepted: ClipboardList,
  application_rejected: FileText,
  payment_received: CircleDollarSign,
  payment_released: CircleDollarSign,
  payment_refunded: CircleDollarSign,
  session_started: BookOpenCheck,
  session_marked_completed: BookOpenCheck,
  session_completed: BookOpenCheck,
  review_received: MessageSquareQuote,
  instructor_verified: ShieldCheck,
  instructor_rejected: ShieldCheck,
  user_suspended: UserCheck,
  user_activated: UserCheck,
};

const typeTones: Partial<Record<NotificationType, string>> = {
  application_received: "text-primary",
  application_accepted: "text-emerald-300",
  application_rejected: "text-error",
  payment_received: "text-tertiary",
  payment_released: "text-emerald-300",
  payment_refunded: "text-error",
  session_started: "text-secondary",
  session_marked_completed: "text-tertiary",
  session_completed: "text-emerald-300",
  review_received: "text-secondary",
  instructor_verified: "text-emerald-300",
  instructor_rejected: "text-error",
  user_suspended: "text-error",
  user_activated: "text-emerald-300",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function badgeCount(count: number) {
  return count > 99 ? "99+" : String(count);
}

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const loadNotifications = useCallback(async () => {
    try {
      const [items, count] = await Promise.all([
        getMyNotifications({ limit: 8 }),
        getUnreadCount(),
      ]);
      setNotifications(items);
      setUnreadCount(count.unread_count);
      setError("");
    } catch {
      setError("Cannot load notifications.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadNotifications();
    const intervalId = window.setInterval(() => void loadNotifications(), POLL_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [loadNotifications]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  async function handleMarkAllRead() {
    try {
      await markAllNotificationsRead();
      await loadNotifications();
    } catch {
      setError("Cannot load notifications.");
    }
  }

  async function handleNotificationClick(notification: Notification) {
    try {
      if (!notification.is_read) {
        await markNotificationRead(notification.id);
      }
      await loadNotifications();
      setIsOpen(false);
      if (notification.link_url) {
        navigate(notification.link_url);
      }
    } catch {
      setError("Cannot load notifications.");
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        aria-label="Notifications"
        className="relative flex size-10 items-center justify-center rounded-md border border-outline-variant bg-surface-container text-on-surface transition hover:bg-surface-container-high"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        <Bell className="size-4" />
        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-on-primary">
            {badgeCount(unreadCount)}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-12 z-50 w-[min(380px,calc(100vw-2rem))] rounded-lg border border-outline-variant bg-surface-container shadow-2xl">
          <div className="flex items-center justify-between gap-md border-b border-outline-variant px-lg py-md">
            <h3 className="text-headline-md text-on-surface">Notifications</h3>
            {unreadCount > 0 ? (
              <button
                className="flex shrink-0 items-center gap-xs text-body-sm text-secondary transition hover:text-secondary-fixed"
                onClick={() => void handleMarkAllRead()}
                type="button"
              >
                <CheckCheck className="size-4" />
                Mark all read
              </button>
            ) : null}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="px-lg py-xl text-center text-body-sm text-on-surface-variant">Loading notifications...</div>
            ) : error ? (
              <div className="px-lg py-xl text-center text-body-sm text-error">{error}</div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-lg py-xl text-center">
                <div className="mb-md flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Bell className="size-5" />
                </div>
                <p className="text-body-md font-medium text-on-surface">No notifications yet.</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const Icon = typeIcons[notification.type] ?? Bell;

                return (
                  <button
                    className={cn(
                      "flex w-full gap-sm border-b border-outline-variant px-lg py-md text-left transition last:border-b-0 hover:bg-surface-container-high",
                      !notification.is_read && "bg-primary/5",
                    )}
                    key={notification.id}
                    onClick={() => void handleNotificationClick(notification)}
                    type="button"
                  >
                    <div
                      className={cn(
                        "mt-xs flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-container-high",
                        typeTones[notification.type] ?? "text-primary",
                      )}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-sm">
                        <p className={cn("text-body-sm text-on-surface", !notification.is_read && "font-medium")}>
                          {notification.title}
                        </p>
                        {!notification.is_read ? <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" /> : null}
                      </div>
                      <p className="mt-xs line-clamp-2 text-body-sm text-on-surface-variant">{notification.message}</p>
                      <p className="mt-xs text-label-md text-on-surface-variant">{formatDate(notification.created_at)}</p>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          <div className="border-t border-outline-variant px-lg py-sm">
            <Link className="text-body-sm text-secondary transition hover:text-secondary-fixed" to="/notifications">
              View all notifications
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
