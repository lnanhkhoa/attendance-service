import React from "react";

export default function LoadingOverlay({ isLoading, children }: { isLoading: boolean; children: React.ReactNode }) {
  return <>{isLoading ? <LoadingPage /> : children}</>;
}

function LoadingPage() {
  return (
    <div className="min-h-screen pt-16 pb-12 flex flex-col bg-slate-800 min-w-full">
      <div className="flex-grow flex flex-col justify-center max-w-7xl w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0 flex justify-center"></div>
        <div className="profile-main-loader mt-10">
          <div className="loader">
            <svg className="circular-loader" viewBox="25 25 50 50">
              <circle className="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#c6c3c3c2" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
