import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

type JwtPayload = {
  exp?: number;
};

function isTokenExpired(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const paddedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");

    const payload = JSON.parse(atob(paddedBase64)) as JwtPayload;

    if (!payload.exp) {
      return true;
    }

    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
