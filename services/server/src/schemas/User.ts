import { list } from "@keystone-6/core";
import { checkbox, password, text, timestamp } from "@keystone-6/core/fields";
import { isValidPassword } from "src/utils/helper";
import { ERROR_MSGS } from "src/utils/handleError";
import hashImpl from "../configs/hashImpl";
import { PASSWORD_SALT } from "src/configs/constants";

const model = list({
  access: () => true,
  fields: {
    email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    password: password({
      workFactor: PASSWORD_SALT,
      bcrypt: { compare: hashImpl.compare, hash: hashImpl.generateHash },
      validation: { isRequired: false, length: { min: 6 } },
      hooks: {
        validateInput({ resolvedData, fieldKey, operation, addValidationError }) {
          if (operation === "update") return;
          if (!resolvedData[fieldKey]) return;
          const pw = resolvedData[fieldKey] || "";
          const isValid = isValidPassword(pw);
          if (!isValid) return addValidationError(ERROR_MSGS["PASSWORD_INVALID"]);
          return resolvedData[fieldKey];
        },
      },
    }),
    firstName: text({ validation: { isRequired: false }, defaultValue: "" }),
    lastName: text({ validation: { isRequired: false }, defaultValue: "" }),
    userPhotoUrl: text({ defaultValue: "" }),

    isSystemAdmin: checkbox({ defaultValue: false }),
    isVerified: checkbox({ defaultValue: false }),
    // relationship

    // create-update
    createdAt: timestamp({ defaultValue: { kind: "now" } }),
    updatedAt: timestamp({ defaultValue: { kind: "now" }, db: { updatedAt: true } }),
  },
});

export const User = { model };
