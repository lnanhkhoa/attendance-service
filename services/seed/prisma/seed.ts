import { PrismaClient } from "@prisma/client";
import { USERS, SYSTEM_USERS, DEFAULT_ROLES, TENANT_ROLES, EMPLOYEES, TENANTS } from "../sample";

async function main() {
  console.log("database: seeding");
  const prisma = new PrismaClient();

  try {
    console.log(`- Adding system configuration`);
    await createSeedSystemConfig(prisma);

    console.log(`- Adding default roles`);
    await createSeedRoles(DEFAULT_ROLES, prisma);

    console.log(`Adding system admin users`);
    await createSeedUsers(SYSTEM_USERS, prisma);

    if (MODE === "development") {
      console.log(`Adding mockup data`);
      await createSeedUsers(USERS, prisma);
      await createSeedTenants(TENANTS, prisma);
      await createSeedOffices(OFFICES, prisma);
      await createSeedDepartments(DEPARTMENTS, prisma);
      await createSeedRoles(TENANT_ROLES, prisma);
      await createSeedEmployees(EMPLOYEES, prisma);
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
