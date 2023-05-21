export const NODE_ENV = process.env.NODE_ENV || "development";
export const isDev = NODE_ENV === "development";

export const DEV_SYSTEM_USER = isDev ? "admin@system.com" : "";
export const DEV_SYSTEM_PASS = isDev ? "Admin@123" : "";

export const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";
