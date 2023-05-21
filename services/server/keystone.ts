import { config } from "@keystone-6/core";
import { schemas } from "./src/schemas";
import { withAuth } from "./src/configs/auth";
import { session } from "src/configs/session";
import { DATABASE_URL } from "./src/configs/constants";

export default withAuth(
  config({
    db: {
      provider: "postgresql",
      url: DATABASE_URL,
      idField: { kind: "cuid" },
      prismaClientPath: "node_modules/.prisma/client",
    },
    lists: schemas,
    session,
    server: {
      port: 4000,
      healthCheck: {
        path: "/status",
        data: { status: "healthy" },
      },
      cors: { origin: "*" },
    },
    graphql: {
      apolloConfig: {
        introspection: true,
      },
    },
  }),
);
