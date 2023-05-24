import { Prisma } from ".prisma/client";
import { faker } from "@faker-js/faker";
import cuid from "cuid";
import bcryptjs from "bcryptjs";
import { TOTAL_SCHOOLS } from "./constants";

const hashedPassword = bcryptjs.hashSync("Admin@123");

export const generateUsers: (total: number, schoolId: string) => Prisma.UserCreateInput[] = (total, schoolId) =>
  new Array(total).fill(1).map((i) => ({
    id: cuid(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    isSystemAdmin: false,
    isVerified: true,
    password: hashedPassword,
    userPhotoUrl: faker.internet.avatar(),
    school: schoolId,
  }));

export const SYSTEM_USERS: Prisma.UserCreateInput[] = [
  {
    id: cuid(),
    email: "admin@system.com",
    firstName: "admin",
    lastName: "system",
    isSystemAdmin: true,
    isVerified: true,
    password: hashedPassword,
    userPhotoUrl: faker.internet.avatar(),
  },
  {
    id: cuid(),
    email: "sysadmin@system.com",
    firstName: "sysadmin",
    lastName: "02",
    isSystemAdmin: true,
    isVerified: true,
    password: hashedPassword,
    userPhotoUrl: faker.internet.avatar(),
  },
];

export const SCHOOLS: Prisma.SchoolCreateInput[] = new Array(TOTAL_SCHOOLS).fill(1).map((i) => ({
  id: cuid(),
  schoolName: faker.company.name(),
  schoolPhotoUrl: faker.image.urlPicsumPhotos(),
  country: faker.location.country(),
  city: faker.location.city(),
}));

export const generateAttendances: (
  schoolId: string,
  userIds: string[],
  type: "checkin" | "checkout",
  createdAt?: string,
) => Prisma.AttendanceCreateInput[] = (schoolId, userIds, type, createdAt = new Date().toISOString()) =>
  userIds.map((userId) => ({
    id: cuid(),
    capturePhotoUrl: faker.image.urlPicsumPhotos(),
    school: schoolId,
    temperature: faker.number.float({ min: 20, max: 35, precision: 0.1 }),
    user: userId,
    type,
    createdAt,
  }));
