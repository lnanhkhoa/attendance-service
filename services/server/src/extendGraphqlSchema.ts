import { Context } from ".keystone/types";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { mergeSchemas } from "@graphql-tools/schema";
import { readFileSync } from "fs";
import { GraphQLSchema } from "graphql";
import _ from "lodash";
import path from "path";
import handleError from "./utils/handleError";
import moment from "moment";
import { faker } from "@faker-js/faker";

const baseFolder = path.join(process.cwd(), "src");

const extendSchemaTypes = [readFileSync(path.join(baseFolder, "extend.graphql")).toString("utf-8")];

export const extendGraphqlSchema = (schema: GraphQLSchema) => {
  const schemas = mergeSchemas({
    schemas: [schema],
    typeDefs: mergeTypeDefs([extendSchemaTypes]),
    resolvers: {
      Mutation: {
        attendCheckin: async function (root: any, { type, date }: { type: string; date: string }, context: Context) {
          const userId = _.get(context, "session.itemId");
          if (!userId) return handleError.throwError("USER_NOT_FOUND");
          const user = await context.db.User.findOne({ where: { id: userId } });
          const school = await context.db.School.findOne({ where: { id: user?.schoolId } });
          if (!user || !school) return handleError.throwError("USER_NOT_FOUND");

          const attendances = await context.db.Attendance.findMany({
            where: {
              school: { id: { equals: school.id } },
              user: { id: { equals: user.id } },
              type: { equals: type },
              createdAt: {
                gte: moment(date).startOf("days").toISOString(),
                lte: moment(date).endOf("days").toISOString(),
              },
            },
          });

          const attendance = attendances[0];

          if (!attendance) {
            //create
            await context.db.Attendance.createOne({
              data: {
                school: { connect: { id: school.id } },
                type: type,
                temperature: faker.number.float({ min: 20, max: 35, precision: 0.1 }),
                capturePhotoUrl: faker.image.urlPicsumPhotos(),
                createdAt: moment(date).set("hours", 7).toISOString(),
                user: { connect: { id: userId } },
              },
            });
          } else {
            await context.db.Attendance.updateOne({
              where: { id: attendance.id },
              data: {
                type: type,
                temperature: faker.number.float({ min: 20, max: 35, precision: 0.1 }),
                capturePhotoUrl: faker.image.urlPicsumPhotos(),
                createdAt: moment(date).set("hours", 7).toISOString(),
              },
            });
          }

          return true;
        },
      },
    },
  });
  return schemas;
};
