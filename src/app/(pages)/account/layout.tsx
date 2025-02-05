"use client";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user,loading] = useAuthState(auth);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);
  if (loading) {
    
    return <div>Loading...</div>;
  }
  return (
    <div className="page bg-primary bg-opacity-5 min-h-96 py-10">
      <div className="container">{children}</div>
    </div>
  );
}
