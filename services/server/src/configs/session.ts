import { SessionStrategy } from "@keystone-6/core/types";
import jwt, { Secret } from "jsonwebtoken";
import { User } from ".prisma/client";
import cookie from "cookie";
import { SESSION_SECRET, ACCESS_TOKEN_LIFE, COOKIE_TOKEN_NAME, ACCESS_TOKEN_LIFE_MS } from "./constants";

declare type SessionsOptions = {
  secret?: Secret;
  maxAge?: number | string;
  secure?: boolean;
  path?: string;
  domain?: string;
  sameSite?: true | false | "lax" | "strict" | "none";
};

export type SessionFields = { itemId: string; listKey: string };

function statelessSessions({
  secret = SESSION_SECRET,
  maxAge = ACCESS_TOKEN_LIFE,
  path = "/",
  secure = false,
  domain,
  sameSite = false,
}: SessionsOptions): SessionStrategy<SessionFields> {
  if (!secret) {
    throw new Error("You must specify a session secret to use sessions");
  }
  return {
    async get(args) {
      const { req } = args.context;
      const cookies = cookie.parse(req?.headers.cookie || "");
      const bearer = req?.headers.authorization?.replace("Bearer ", "");
      const token = bearer || cookies[COOKIE_TOKEN_NAME];
      try {
        const data = jwt.verify(token, secret, { maxAge }) as SessionFields;
        if (!data) return;
        return data;
      } catch (error: any) {
        return;
      }
    },
    async end(args) {
      const { res, req } = args.context;
      delete req?.headers.authorization;
      res?.setHeader(
        "Set-Cookie",
        cookie.serialize(COOKIE_TOKEN_NAME, null, {
          maxAge: 0,
          expires: new Date(),
          httpOnly: true,
          secure,
          path,
          sameSite,
          domain,
        }),
      );
    },
    async start(args) {
      const { data } = args;
      const { res } = args.context;

      try {
        const newToken = jwt.sign({ ...Object(data) }, secret, {
          algorithm: "HS256",
          expiresIn: maxAge,
        });
        res?.setHeader(
          "Set-Cookie",
          cookie.serialize(COOKIE_TOKEN_NAME, newToken, {
            maxAge: ACCESS_TOKEN_LIFE_MS,
            expires: new Date(Date.now() + ACCESS_TOKEN_LIFE_MS * 1000),
            httpOnly: true,
            secure,
            path,
            sameSite,
            domain,
          }),
        );

        return newToken;
      } catch (error) {
        return "";
      }
    },
  };
}

export const session = statelessSessions({
  maxAge: ACCESS_TOKEN_LIFE,
  secret: SESSION_SECRET,
  sameSite: "lax",
});

export const sessionDataQuery = `id email firstName lastName isSystemAdmin`;

export type SessionContextData = {
  itemId: string;
  listKey: "User";
  iat?: number;
  exp?: number;
  data?: User;
};
