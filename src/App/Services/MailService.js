import nodemailer from 'nodemailer';

/**
 * Mail Service
 *
 * @class MailService
 */
export default class MailService {
  /**
   * Create the transport
   *
   * @static
   * @returns {Mail} Mail transport
   * @memberof MailService
   */
  static createTransport() {
    return nodemailer.createTransport({
      host: process.env.MAIL_SMTP_HOST,
      port: process.env.MAIL_SMTP_PORT,
      secureConnection: process.env.MAIL_SMTP_SECURE,
      auth: {
        user: process.env.MAIL_SMTP_USERNAME,
        pass: process.env.MAIL_SMTP_PASSWORD,
      },
    });
  }

  /**
   * Send an e-mail
   *
   * @static
   * @param {MailTemplate} template - Mail template to send
   * @memberof MailService
   */
  static async send(template) {
    return this.createTransport().sendMail(template);
  }
}
