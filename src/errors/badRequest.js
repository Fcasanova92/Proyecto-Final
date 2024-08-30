export class BadRequest extends Error {
    constructor(message) {
      super(message);
      this.name = 'BadRequest'; // Nombre del error personalizado
      this.status = 404; // Código de estado HTTP opcional
      // Captura la pila de llamadas, esto puede ser útil para depurar
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, BadRequest);
      }
    }
  }