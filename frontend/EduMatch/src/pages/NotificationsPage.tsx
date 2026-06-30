import { useCallback, useEffect, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { cn } from "@/lib/utils";
import {
  getMyNotifications,
  getUnreadCount,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/services/notifications.service";
import type { Notification } from "@/types/notification";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionPending, setActionPending] = useState(false);
  const navigate = useNavigate();

  const loadNotifications = useCallback(async () => {
    try {
      const [items, count] = await Promise.all([
        getMyNotifications({ limit: 100 }),
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
  }, [loadNotifications]);

  async function openNotification(notification: Notification) {
    setActionPending(true);
    try {
      if (!notification.is_read) {
        await markNotificationRead(notification.id);
      }
      await loadNotifications();
      if (notification.link_url) {
        navigate(notification.link_url);
      }
    } catch {
      setError("Cannot load notifications.");
    } finally {
      setActionPending(false);
    }
  }

  async function markAllRead() {
    setActionPending(true);
    try {
      await markAllNotificationsRead();
      await loadNotifications();
    } catch {
      setError("Cannot load notifications.");
    } finally {
      setActionPending(false);
    }
  }

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <div className="flex flex-col gap-md md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-headline-lg text-on-surface">Notifications</h1>
            <p className="mt-xs max-w-2xl text-body-sm text-on-surface-variant">
              Review account updates, session activity, applications, and payment events.
            </p>
          </div>
          {unreadCount > 0 ? (
            <button
              className="inline-flex h-10 items-center justify-center gap-xs rounded-md border border-secondary/40 px-md text-body-sm text-secondary transition hover:bg-secondary/10 disabled:opacity-50"
              disabled={actionPending}
              onClick={() => void markAllRead()}
              type="button"
            >
              <CheckCheck className="size-4" />
              Mark all as read
            </button>
          ) : null}
        </div>
      </header>

      <main className="px-margin-mobile py-lg md:px-margin-desktop">
        {error ? <ErrorState className="mb-md" message={error} /> : null}
        {loading ? (
          <LoadingState message="Loading notifications..." />
        ) : notifications.length === 0 ? (
          <EmptyState title="No notifications yet." message="Important platform updates will appear here when actions happen." />
        ) : (
          <section className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container">
            {notifications.map((notification) => (
              <button
                className={cn(
                  "flex w-full gap-md border-b border-outline-variant px-lg py-md text-left transition last:border-b-0 hover:bg-surface-container-high disabled:opacity-60",
                  !notification.is_read && "bg-primary/5",
                )}
                disabled={actionPending}
                key={notification.id}
                onClick={() => void openNotification(notification)}
                type="button"
              >
                <div className="mt-xs flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Bell className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-xs sm:flex-row sm:items-start sm:justify-between">
                    <h2 className={cn("text-body-md text-on-surface", !notification.is_read && "font-semibold")}>
                      {notification.title}
                    </h2>
                    <span className="shrink-0 text-label-md text-on-surface-variant">
                      {formatDate(notification.created_at)}
                    </span>
                  </div>
                  <p className="mt-xs text-body-sm text-on-surface-variant">{notification.message}</p>
                  {!notification.is_read ? (
                    <span className="mt-sm inline-flex items-center rounded-full bg-primary/15 px-sm py-0.5 text-label-md text-primary">
                      Unread
                    </span>
                  ) : null}
                </div>
              </button>
            ))}
          </section>
        )}
      </main>
    </>
  );
}
