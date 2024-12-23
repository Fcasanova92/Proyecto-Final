import { login } from './login.js';
import { register } from './register.js';
import { verifyRegister } from './verifyRegister.js';
import { newCodeVerify } from './newCode.js';

export const responseSelector = async (type, data) => {
  let response;
  switch (type) {
    case 'login':
      response = await login(data);
      break;

    case 'register':
      response = register(data);
      break;

    case 'verify':
      response = verifyRegister(data);
      break;

    case 'resend':
      response = newCodeVerify(data);
      break;
  }
  return response;
};
