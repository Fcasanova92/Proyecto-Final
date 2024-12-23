export const newCodeVerify = async (user) => {
  try {
    const response = await fetch('/api/auth/new-code-verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...user, code: 'null' }),
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
    if (response.status === 403) {
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
