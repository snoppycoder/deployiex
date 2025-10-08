"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import useCurrentSession from "@/hooks/useCurrentSession";
import { useAuthContext } from "@/context/AuthContext";

/**
 * Next.js App Router: Client-side guard hook to protect authenticated routes.
 * Use inside a layout or page client component for areas like admin or app.
 */
export function useProtectRoute(options?: { signinPath?: string }) {
  // In Next.js, route groups like (auth) are not part of the URL. Your sign-in page lives at /sign-in.
  const signinPath = options?.signinPath ?? "/sign-in";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session, isLoading } = useCurrentSession();

  useEffect(() => {
    if (isLoading) return;
    if (!session) {
      const search = searchParams.toString();
      const currentUrl = search ? `${pathname}?${search}` : pathname;
      router.replace(
        `${signinPath}?redirectTo=${encodeURIComponent(currentUrl)}`
      );
    }
  }, [isLoading, session, pathname, searchParams, router, signinPath]);

  return { isLoading, session } as const;
}

/**
 * Next.js App Router: Client-side hook to prevent access for authenticated users
 * (e.g., Sign-in/Sign-up pages). Redirects to home by default.
 */
export function usePreventRoute(options?: { authenticatedRedirect?: string }) {
  const authenticatedRedirect = options?.authenticatedRedirect ?? "/";
  const router = useRouter();
  const { data: session, isLoading } = useCurrentSession();

  useEffect(() => {
    if (isLoading) return;
    if (session) {
      router.replace(authenticatedRedirect);
    }
  }, [isLoading, session, router, authenticatedRedirect]);

  return { isLoading, session } as const;
}

/**
 * Optional lightweight wrapper components for convenience.
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isLoading, session } = useProtectRoute();
  if (isLoading) return null; // or a spinner
  if (!session) return null;
  return children as any;
}
export function AuthOnly({ children }: { children: React.ReactNode }) {
  // we will use this route protector to protect admin route when we have an admin acc
  const router = useRouter();
  const { isLoggedIn, session } = useAuthContext();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/sign-in");
      return;
    }
    if (!session) {
      router.replace("/sign-in");
      return;
    }

    if ((session as any).role !== "Admin") {
      router.replace("/sign-in"); // or "/unauthorized"
      return;
    }

    setIsAllowed(true);
  }, [isLoggedIn, session, router]);

  // Show nothing until check finishes
  if (!isAllowed) return null;

  return children as any;
}

export function GuestOnly({ children }: { children: React.ReactNode }) {
  const { isLoading, session } = usePreventRoute();
  if (isLoading) return null;
  if (session) return null;
  return children as any;
}
