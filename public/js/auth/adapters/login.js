export const login = async (user) => {
  try {
    const response = await fetch('/api/auth/login', {
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
    console.log(data);
    if (response.status === 401) {
      return {
        status: false,
        id: data.field,
        message: data.message,
      };
    }
  } catch (error) {
    console.log('Error:', error);
  }
};
