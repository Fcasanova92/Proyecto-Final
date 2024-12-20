import nodemailer from 'nodemailer';
import EmailService from './email.service.js';
import { EMAIL, PASSWORD } from '../../utils/env.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

// Clase especializada para usar con nodemailer
class NodeMailerService extends EmailService {
  constructor() {
    super(transporter); // Llamar al constructor de la clase base (EmailService)
  }

  // Método para enviar un mensaje predefinido
  sendWelcomeEmail = async (to) => {
    const message = {
      from: EMAIL,
      to: to,
      subject: 'Bienvenido a nuestra aplicación',
      text: 'Gracias por registrarte en nuestra aplicación.',
    };

    await this.sendMail(message); // Llamar al método de la clase base para enviar el correo
  };
}

// Uso del servicio
export const emailService = new NodeMailerService();
