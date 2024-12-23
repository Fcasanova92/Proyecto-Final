import { redirectLogout } from '../helpers/redirectLogout.js';

export const logout = async () => {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });
    const data = await response.json();
    if (response.ok) {
      redirectLogout();
    }
    if (response.status === 401) {
      return {
        status: false,
        id: data.dataError,
        message: data.message,
      };
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
