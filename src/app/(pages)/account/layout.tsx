"use client";
import { redirect, useRouter } from "next/navigation";
import { auth } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  return (
    <div>
      {/* Add shared components here, e.g., a sidebar or header */}
      <div>{children}</div>
    </div>
  );
}
