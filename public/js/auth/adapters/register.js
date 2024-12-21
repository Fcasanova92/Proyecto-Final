export const register = async (user) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (response.ok) {
      return { status: true, message: data.message };
    }

    if (response.status === 401) {
      return {
        status: false,
        id: data.dataError,
        message: data.message,
      };
    }
  } catch (error) {
    console.error(error);
  }
};
