import { list } from "@keystone-6/core";
import { checkbox, password, text, timestamp } from "@keystone-6/core/fields";

const model = list({
  access: () => true,
  fields: {
    schoolName: text({ validation: { isRequired: false }, defaultValue: "" }),
    schoolPhotoUrl: text({ defaultValue: "" }),
    city: text({ defaultValue: "" }),
    country: text({ defaultValue: "" }),
    // relationship

    // create-update
    createdAt: timestamp({ defaultValue: { kind: "now" } }),
    updatedAt: timestamp({ defaultValue: { kind: "now" }, db: { updatedAt: true } }),
  },
});

export const School = { model };
