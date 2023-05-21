import { isEmpty } from "lodash";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const hasWindow = typeof window !== "undefined";

const authState = {
  isLoggedIn: false,
  logout: () => true,
  login: (accessToken: string) => true,
};
type AuthState = typeof authState;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn:
        hasWindow && !isEmpty(localStorage.getItem("accessToken")) && !isEmpty(localStorage.getItem("refreshToken")),
      logout: () => {
        hasWindow && localStorage.removeItem("accessToken");
        set((state) => ({ ...state, isLoggedIn: false }));
        return true;
      },
      login: (accessToken: string) => {
        hasWindow && localStorage.setItem("accessToken", accessToken);
        set((state) => ({ ...state, isLoggedIn: true }));
        return true;
      },
    }),
    { name: "auth" },
  ),
);
