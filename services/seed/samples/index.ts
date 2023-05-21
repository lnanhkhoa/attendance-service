import { Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import cuid from "cuid";
import bcryptjs from "bcryptjs";

export const USERS: Prisma.UserCreateInput[] = new Array(10_000).fill(1).map((i) => ({
  id: cuid(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  isSystemAdmin: false,
  isVerified: true,
  password: bcryptjs.hashSync("Admin@123"),
  userPhotoUrl: faker.internet.avatar(),
}));

export const SYSTEM_USERS: Prisma.UserCreateInput[] = [
  {
    id: cuid(),
    email: "admin@system.com",
    firstName: "admin",
    lastName: "system",
    isSystemAdmin: true,
    isVerified: true,
    password: bcryptjs.hashSync("Admin@123"),
  },
  {
    id: cuid(),
    email: "sysadmin@system.com",
    firstName: "sysadmin",
    lastName: "02",
    isSystemAdmin: true,
    isVerified: true,
    password: bcryptjs.hashSync("Admin@123"),
  },
];

export const SCHOOLS: Prisma.SchoolCreateInput[] = new Array(1_000).fill(1).map((i) => ({
  id: cuid(),
  schoolName: faker.company.name(),
  schoolPhotoUrl: faker.image.urlLoremFlickr(),
}));
