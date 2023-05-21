//
import { PASSWORD_LENGTH } from "src/configs/constants";

//
export const isValidPassword = (password: string | null | undefined) => {
  if (!password) return false;
  if (password.length >= PASSWORD_LENGTH.min && password.length <= PASSWORD_LENGTH.max) return true;
  return false;
};
