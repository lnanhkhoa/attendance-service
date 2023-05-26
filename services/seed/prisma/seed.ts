import { PrismaClient } from ".prisma/client";
import { SYSTEM_USERS, SCHOOLS, generateUsers, generateAttendances, hashedPassword } from "../samples";
import moment from "moment";
import { TOTAL_STUDENTS_PER_SCHOOL } from "../constants";
import { faker } from "@faker-js/faker";
import cuid from "cuid";

async function main() {
  console.log("database: seeding");
  const prisma = new PrismaClient();
  await prisma.$connect();

  try {
    console.log("database: seed start");
    await prisma.user.createMany({ data: SYSTEM_USERS, skipDuplicates: true });
    for (let index = 0; index < SCHOOLS.length; index++) {
      console.log("bulk create school and user: ", index);
      const school = await prisma.school.create({ data: SCHOOLS[index] });
      // 5k users in one school
      await prisma.user.createMany({ data: generateUsers(TOTAL_STUDENTS_PER_SCHOOL, school.id), skipDuplicates: true });
      if (index === 0) {
        await prisma.user.create({
          data: {
            id: cuid(),
            email: "khoale@mailinator.com",
            firstName: "Khoa",
            lastName: "Le",
            isSystemAdmin: false,
            isVerified: true,
            password: hashedPassword,
            userPhotoUrl: faker.internet.avatar(),
            school: school.id,
          },
        });
      }

      const users = await prisma.user.findMany({ where: { school: { equals: school.id } } });

      // sample attendances
      for (let indexDate = 0; indexDate < 30; indexDate++) {
        await prisma.attendance.createMany({
          data: generateAttendances(
            school.id,
            faker.helpers.arrayElements(
              users.map((i) => i.id),
              { min: Math.floor(users.length / 2), max: users.length },
            ),
            "checkin",
            moment().subtract(30, "days").add(indexDate, "day").startOf("days").toISOString(),
          ),
          skipDuplicates: true,
        });
        await prisma.attendance.createMany({
          data: generateAttendances(
            school.id,
            faker.helpers.arrayElements(
              users.map((i) => i.id),
              {
                min: Math.floor(users.length / 2),
                max: users.length,
              },
            ),
            "checkout",
            moment().subtract(8, "days").add(indexDate, "day").endOf("days").toISOString(),
          ),
          skipDuplicates: true,
        });
      }
    }

    console.log("database: seed done");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
