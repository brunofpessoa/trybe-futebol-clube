import { genSalt, hash, compare } from 'bcryptjs';

async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

async function isPasswordCompatible(password: string, passwordHash: string): Promise<boolean> {
  return compare(password, passwordHash);
}

export {
  hashPassword,
  isPasswordCompatible,
};
