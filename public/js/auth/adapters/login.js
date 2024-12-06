export const login = async (data) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('La respuesta es', response.status);

    if (response.ok) {
      const result = await response.json();
      const { token } = result;

      console.log('La respuesta es', response.status);

      // Almacenamos el token en sessionStorage
      sessionStorage.setItem('token', token);

      return { status: true, message: 'Bienvenido a MotorShop' };
    } else {
      const errorData = await response.json();
      if (response.status === 401) {
        return {
          status: false,
          id: errorData.fieldError,
          message: errorData.message,
        };
      }
    }
  } catch (error) {
    console.log('Error:', error);
  }
};
