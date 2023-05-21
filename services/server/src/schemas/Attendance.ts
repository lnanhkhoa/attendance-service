import { list } from "@keystone-6/core";
import { checkbox, password, text, timestamp, select, relationship, integer } from "@keystone-6/core/fields";

const AttendanceTypes = [
  { label: "Checkin", value: "checkin" },
  { label: "Checkout", value: "checkout" },
];

const model = list({
  access: () => true,
  fields: {
    type: select({ options: AttendanceTypes, defaultValue: "checkin" }),
    temperature: integer({ defaultValue: 0 }),
    capturePhotoUrl: text({ defaultValue: "" }),
    // relationship
    user: relationship({ many: false, ref: "School" }),
    school: relationship({ many: false, ref: "School" }),

    // create-update
    createdAt: timestamp({ defaultValue: { kind: "now" } }),
    updatedAt: timestamp({ defaultValue: { kind: "now" }, db: { updatedAt: true } }),
  },
});

export const Attendance = { model };
