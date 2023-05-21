require("dotenv").config();
import ms from "ms";

export const NODE_ENV = process.env.NODE_ENV || "development";
export const SESSION_SECRET = process.env.SESSION_SECRET || "secret-key";
export const ACCESS_TOKEN_LIFE = "1d";
export const ACCESS_TOKEN_LIFE_MS = typeof ACCESS_TOKEN_LIFE === "number" ? ACCESS_TOKEN_LIFE : ms(ACCESS_TOKEN_LIFE);

export const COOKIE_TOKEN_NAME = "keystonejs-session"; // keystone default name

export const DATABASE_URL = process.env.DATABASE_URL || "";
export const PASSWORD_SALT = 10;
export const PASSWORD_LENGTH = { min: 8, max: 500 };
