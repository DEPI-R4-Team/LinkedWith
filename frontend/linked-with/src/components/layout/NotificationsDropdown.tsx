import { useEffect, useRef, useState } from "react";
import {
  Bell,
  BookOpenCheck,
  CheckCheck,
  CircleDollarSign,
  ClipboardList,
  FileText,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type { Notification, NotificationType } from "@/types/notification";
import { cn } from "@/lib/utils";

const typeIcons: Record<NotificationType, typeof Bell> = {
  application_received: FileText,
  application_accepted: ClipboardList,
  application_rejected: FileText,
  session_reminder: BookOpenCheck,
  session_completed: BookOpenCheck,
  payment_held: CircleDollarSign,
  payment_released: CircleDollarSign,
  verification_update: ShieldCheck,
  instant_request: Zap,
};

const typeTones: Record<NotificationType, string> = {
  application_received: "text-primary",
  application_accepted: "text-emerald-300",
  application_rejected: "text-error",
  session_reminder: "text-secondary",
  session_completed: "text-emerald-300",
  payment_held: "text-tertiary",
  payment_released: "text-emerald-300",
  verification_update: "text-primary",
  instant_request: "text-tertiary",
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "application_received",
    title: "New Application",
    message: "James Smith applied to your AI-Driven Medical Diagnostics project.",
    isRead: false,
    createdAt: "2 min ago",
  },
  {
    id: "2",
    type: "session_reminder",
    title: "Session Reminder",
    message: "Your session with Aisha Khan starts in 30 minutes.",
    isRead: false,
    createdAt: "28 min ago",
  },
  {
    id: "3",
    type: "payment_released",
    title: "Payment Released",
    message: "Payment of 500 EGP has been released to your wallet.",
    isRead: false,
    createdAt: "1 hour ago",
  },
  {
    id: "4",
    type: "application_accepted",
    title: "Application Accepted",
    message: "Your application for Blockchain Voting System was accepted.",
    isRead: true,
    createdAt: "3 hours ago",
  },
  {
    id: "5",
    type: "session_completed",
    title: "Session Completed",
    message: "Your session with Michael Rodriguez has been marked as completed.",
    isRead: true,
    createdAt: "Yesterday",
  },
];

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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

  function handleMarkAllRead() {
    setNotifications((current) =>
      current.map((n) => ({ ...n, isRead: true })),
    );
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
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-on-primary">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-[380px] rounded-lg border border-outline-variant bg-surface-container shadow-2xl">
          <div className="flex items-center justify-between border-b border-outline-variant px-lg py-md">
            <h3 className="text-headline-md text-on-surface">Notifications</h3>
            {unreadCount > 0 && (
              <button
                className="flex items-center gap-xs text-body-sm text-secondary transition hover:text-secondary-fixed"
                onClick={handleMarkAllRead}
                type="button"
              >
                <CheckCheck className="size-4" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-lg py-xl text-center">
                <div className="mb-md flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Bell className="size-5" />
                </div>
                <p className="text-body-md font-medium text-on-surface">No notifications</p>
                <p className="mt-xs text-body-sm text-on-surface-variant">
                  You're all caught up!
                </p>
              </div>
            ) : (
              notifications.map((notification) => {
                const Icon = typeIcons[notification.type];

                return (
                  <div
                    className={cn(
                      "flex gap-sm border-b border-outline-variant px-lg py-md transition last:border-b-0 hover:bg-surface-container-high",
                      !notification.isRead && "bg-primary/5",
                    )}
                    key={notification.id}
                  >
                    <div
                      className={cn(
                        "mt-xs flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-container-high",
                        typeTones[notification.type],
                      )}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-sm">
                        <p className={cn(
                          "text-body-sm text-on-surface",
                          !notification.isRead && "font-medium",
                        )}>
                          {notification.title}
                        </p>
                        {!notification.isRead && (
                          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="mt-xs text-body-sm text-on-surface-variant line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="mt-xs text-label-md text-on-surface-variant">
                        {notification.createdAt}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
