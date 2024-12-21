import nodemailer from 'nodemailer';
import EmailService from './email.service.js';
import { EMAIL, PASSWORD } from '../../utils/env.js';
import { InternalServerError } from '../../utils/errors.js';

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

class NodeMailerService extends EmailService {
  constructor() {
    super(transporter);
  }

  sendWelcomeEmail = async (to, body) => {
    const message = {
      from: EMAIL,
      to: to,
      subject: 'Bienvenido a nuestra aplicación',
      html: body,
    };

    try {
      await this.sendMail(message);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  };
}

export const emailService = new NodeMailerService();
