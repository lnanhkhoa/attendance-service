import React, { useEffect, useState } from "react";

// components

import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import HeaderStats from "@/components/Headers/HeaderStats";
import FooterAdmin from "@/components/Footers/FooterAdmin";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/router";
import LoadingOverlay from "./loading-overlay";

export default function Admin({ children }: any) {
  const { isLoggedIn } = useAuthStore();
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login");
    }
    setTimeout(() => {
      setIsReady(true);
    }, 300);
  }, [isLoggedIn, router]);

  return (
    <LoadingOverlay isLoading={!isReady}>
      <Sidebar />
      <div className="relative md:ml-64 bg-slate-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </LoadingOverlay>
  );
}
