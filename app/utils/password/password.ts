import bcrypt from "bcrypt"


export async function saltAndHAshPassword(password: {password: string}) {
  const hashedAndSaltedPassword = await bcrypt.hash(password);
 return hashedAndSaltedPassword
} 

export async function comparePassword(password: { password: string }, hashedPassword: string) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
} 