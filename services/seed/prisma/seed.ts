import { PrismaClient } from ".prisma/client";
import { SYSTEM_USERS, SCHOOLS, generateUsers, generateAttendances } from "../samples";
import moment from "moment";
import { TOTAL_STUDENTS_PER_SCHOOL } from "../constants";

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

      const users = await prisma.user.findMany({ where: { school: { equals: school.id } } });

      // sample attendances
      const startDay = moment("2020-04-15T07:00:00.000+07:00");
      const endDay = moment("2020-04-15T17:00:00.000+07:00");
      for (let indexDate = 0; indexDate < 5; indexDate++) {
        await prisma.attendance.createMany({
          data: generateAttendances(
            school.id,
            users.map((i) => i.id),
            "checkin",
            startDay.add(indexDate, "day").toISOString(),
          ),
          skipDuplicates: true,
        });
        await prisma.attendance.createMany({
          data: generateAttendances(
            school.id,
            users.map((i) => i.id),
            "checkout",
            endDay.add(indexDate, "day").toISOString(),
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
