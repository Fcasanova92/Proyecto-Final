import { InternalServerError } from '../../utils/errors.js';
import { productModel } from '../../models/product.js';

export const saveUserInDb = async (user) => {
  try {
    const newUser = await userModel.create(user);
    if (newUser) {
      return { message: 'Registro existoso' };
    }
  } catch (error) {
    throw new InternalServerError(
      `Error de base de datos al guardar el producto: ${error.message}`
    );
  }
};

export const getAllUserFromDb = async () => {
  try {
    const users = await userModel.find().lean();
    return users;
  } catch (error) {
    throw new InternalServerError(
      `Error de base de datos al obtener productos: ${error.message}`
    );
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await userModel.findOne({ email: email }).lean();
    return user;
  } catch (error) {
    throw new InternalServerError(
      `Error de base de datos al obtener usuario con email ${email}: ${error.message}`
    );
  }
};

export const getUserById = async (id) => {
  try {
    const user = await userModel.findOne({ uid: id }).lean();
    return user;
  } catch (error) {
    throw new InternalServerError(
      `Error de base de datos al obtener usuario con ID ${id}: ${error.message}`
    );
  }
};

export const updateUserInDb = async (id, user) => {
  try {
    await userModel.updateOne({ uid: id }, user);
    return { message: 'Usuario actualizado correctamente.' };
  } catch (error) {
    throw new InternalServerError(
      `Error de base de datos al actualizar usuario con ID ${id}: ${error.message}`
    );
  }
};

export const deleteUserFromDb = async (id) => {
  try {
    await userModel.deleteOne({ uid: id });
    return { message: 'Usuario eliminado correctamente.' };
  } catch (error) {
    throw new InternalServerError(
      `Error de base de datos al eliminar usuario con ID ${id}: ${error.message}`
    );
  }
};
