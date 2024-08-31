export class InternalServerError extends Error {
    constructor(message) {
      super(message);
      this.name = 'InternalServerError'; // Nombre del error personalizado
      this.status = 500; // Código de estado HTTP opcional
      // Captura la pila de llamadas, esto puede ser útil para depurar
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, InternalServerError);
      }
    }
  }