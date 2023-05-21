import type { Context } from ".keystone/types";
import { SessionStrategy } from "@keystone-6/core/types";
import { createAuth } from "@keystone-6/auth";
import { KeystoneConfig } from "@keystone-6/core/types";

import { SessionContextData, sessionDataQuery } from "./session";

export const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: sessionDataQuery,
  initFirstItem: {
    fields: ["email", "password", "firstName", "lastName"],
  },
});

async function getDataItem(sudoContext: Context, { listKey, itemId }: { listKey: string; itemId: string }) {
  if (!itemId) return undefined;
  const data = await sudoContext.query[listKey].findOne({
    where: { id: itemId },
    query: sessionDataQuery,
  });
  return data;
}

export const withSessionData = (
  _sessionStrategy: SessionStrategy<Record<string, any>>,
): SessionStrategy<SessionContextData> => {
  const { get, end, ...sessionStrategy } = _sessionStrategy;
  return {
    ...sessionStrategy,
    // @ts-ignore
    get: async ({ context: _context }) => {
      const context = _context as Context;
      const session = (await get({ context })) as SessionContextData;
      if (!session || !session.listKey || !session.itemId || !context.query[session.listKey]) {
        await end({ context });
        return null;
      }

      const { listKey = "User", itemId = "" } = session;
      const data = await getDataItem(context, { itemId, listKey });
      const newSessionData = {
        ...session,
        itemId: itemId,
        listKey: listKey,
        data,
      } as SessionContextData;
      return newSessionData;
    },
  };
};

export const myAuth = (keystoneConfig: KeystoneConfig): KeystoneConfig => {
  if (!keystoneConfig.session) throw new TypeError("Missing .session configuration");
  return {
    ...keystoneConfig,
    session: withSessionData(keystoneConfig.session),
  };
};
