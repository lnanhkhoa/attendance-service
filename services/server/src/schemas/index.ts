import { ListSchemaConfig } from "@keystone-6/core/types";
import { User } from "./User";
import { School } from "./School";
import { Attendance } from "./Attendance";

export const schemas: ListSchemaConfig = {
  User: User.model,
  School: School.model,
  Attendance: Attendance.model,
};
