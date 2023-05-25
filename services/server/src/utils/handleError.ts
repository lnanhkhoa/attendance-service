import { GraphQLError } from "graphql";
import { template, templateSettings } from "lodash";

templateSettings.interpolate = /{{([\s\S]+?)}}/g;

export const ERROR_MSGS = {
  INTERNAL_SERVER_ERROR: "Internal server error.",
  PASSWORD_INVALID: "Invalid password.",
  USER_NOT_FOUND: "User not found",
};

function throwError(msgCode: keyof typeof ERROR_MSGS, params?: any): never {
  const errMessage = template(ERROR_MSGS[msgCode])(params);
  throw new GraphQLError(errMessage, {
    extensions: {
      code: msgCode,
    },
  });
}

export default { throwError };
