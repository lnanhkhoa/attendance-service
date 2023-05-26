import { config } from "@keystone-6/core";
import { schemas } from "./src/schemas";
import { withAuth } from "./src/configs/auth";
import { session } from "src/configs/session";
import { DATABASE_URL } from "./src/configs/constants";
import { extendGraphqlSchema } from "src/extendGraphqlSchema";

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
    extendGraphqlSchema: extendGraphqlSchema,
    server: {
      port: 4000,
      healthCheck: {
        path: "/status",
        data: { status: "healthy" },
      },
      cors: true,
    },
    graphql: {
      apolloConfig: {
        introspection: true,
      },
    },
  }),
);
