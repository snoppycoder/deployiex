"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import useCurrentSession, {
  CURRENT_SESSION_QUERY_KEY,
  getCurrentSession,
} from "@/hooks/useCurrentSession";
import { queryClient } from "@/providers/QueryClientProvider";
import { auth } from "@/lib/auth";
import { userControllerGetCurrentUser } from "@/app/api/gen";

type AuthContextType = {
  isLoggedIn: boolean;
  session: Awaited<ReturnType<typeof getCurrentSession>> | null | undefined;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useCurrentSession();
  const [enhancedSession, setEnhancedSession] = useState(session);

  useEffect(() => {
    async function fetchRole() {
      if (!session) return;

      try {
        const { data } = await userControllerGetCurrentUser({});
        if (data) {
          setEnhancedSession({ ...(session as any), role: data.role });
        }
      } catch (err) {
        console.error("Failed to fetch user role:", err);
      }
    }

    fetchRole();
  }, [session]);

  const isLoggedIn = Boolean(session);

  const refreshSession = async () => {
    await queryClient.invalidateQueries({
      queryKey: [CURRENT_SESSION_QUERY_KEY],
    });
    await queryClient.refetchQueries({ queryKey: [CURRENT_SESSION_QUERY_KEY] });
  };

  const logout = async () => {
    try {
      await auth.signOut();
    } finally {
      await queryClient.removeQueries({
        queryKey: [CURRENT_SESSION_QUERY_KEY],
      });
    }
  };

  const value: AuthContextType = {
    isLoggedIn,
    session: enhancedSession,
    refreshSession,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within AuthProvider");
  return context;
}
