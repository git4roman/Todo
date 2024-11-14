import bcrypt from "bcryptjs";

async function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
export default hashPassword;
