import React, { useEffect, useState } from "react";

// components

import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import FooterAdmin from "@/components/Footers/FooterAdmin";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/router";
import LoadingOverlay from "./loading-overlay";
import CardStats from "@/components/Cards/CardStats";
import clsx from "clsx";

export default function Admin({ children, hideHeader }: any) {
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
        <div className="relative bg-slate-800 md:pt-32 pb-16 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div className={clsx("pb-32", hideHeader ? "hidden" : "")}>
              {/* Card stats */}
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="TRAFFIC"
                    statTitle="350,897"
                    statArrow="up"
                    statPercent="3.48"
                    statPercentColor="text-emerald-500"
                    statDescripiron="Since last month"
                    statIconName="far fa-chart-bar"
                    statIconColor="bg-red-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="NEW USERS"
                    statTitle="2,356"
                    statArrow="down"
                    statPercent="3.48"
                    statPercentColor="text-red-500"
                    statDescripiron="Since last week"
                    statIconName="fas fa-chart-pie"
                    statIconColor="bg-orange-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="SALES"
                    statTitle="924"
                    statArrow="down"
                    statPercent="1.10"
                    statPercentColor="text-orange-500"
                    statDescripiron="Since yesterday"
                    statIconName="fas fa-users"
                    statIconColor="bg-pink-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="PERFORMANCE"
                    statTitle="49,65%"
                    statArrow="up"
                    statPercent="12"
                    statPercentColor="text-emerald-500"
                    statDescripiron="Since last month"
                    statIconName="fas fa-percent"
                    statIconColor="bg-sky-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 md:px-10 mx-auto w-full -m-24 h-full">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </LoadingOverlay>
  );
}
