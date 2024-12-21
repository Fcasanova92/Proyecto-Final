import { v4 as uuidv4 } from 'uuid';
import cryptoRandomString from 'crypto-random-string';

export const uidGenerator = () => {
  return uuidv4();
};

export const verifyCodeGenerator = () => {
  // Genera un código numérico de 6 dígitos
  return cryptoRandomString({ length: 6, type: 'alphanumeric' });
};
