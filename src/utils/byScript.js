import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error al hashear la contraseña');
  }
};

export const comparePassword = async (password, userPassword) => {
  try {
    const compare = await bcrypt.compare(password, userPassword);

    return compare;
  } catch (error) {
    throw new Error('Error en la desincriptacion');
  }
};
