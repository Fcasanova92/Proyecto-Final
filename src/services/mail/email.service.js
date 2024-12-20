import { InternalServerError } from '../../utils/errors.js';

class EmailService {
  constructor(transporter) {
    this.transporter = transporter;
  }

  // Método para enviar el correo
  sendMail = async (message) => {
    try {
      await this.transporter.sendMail(message); // Usar 'this.transporter'
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  };
}
export default EmailService;
