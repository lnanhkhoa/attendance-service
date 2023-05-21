import bcrypt from "bcryptjs";
import { PASSWORD_SALT } from "./constants";

const workFactor = PASSWORD_SALT;

export async function generateHash(secret: string) {
  return bcrypt.hash(secret, workFactor);
}
export async function compare(secret: string, hash: string) {
  return bcrypt.compare(secret, hash);
}

export default { generateHash, compare };
