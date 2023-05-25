import React, { useEffect, useState } from "react";

// components

import Navbar from "@/components/Navbars/AuthNavbar";
import FooterSmall from "@/components/Footers/FooterSmall";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/useAuthStore";
import LoadingOverlay from "./loading-overlay";

export default function Auth({ children }: any) {
  const { isLoggedIn } = useAuthStore();
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 300);
  }, [isLoggedIn, router]);

  return (
    <LoadingOverlay isLoading={!isReady}>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-slate-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url('/img/register_bg_2.png')",
            }}></div>
          {children}
          <FooterSmall absolute />
        </section>
      </main>
    </LoadingOverlay>
  );
}
