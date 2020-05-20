/**
 * Mail Template
 *
 * @export
 * @class MailTemplate
 */
export default class MailTemplate {
  /**
   * Create an instance of MailTemplate.
   * @param {string} to To address
   * @memberof MailTemplate
   */
  constructor(to) {
    this.from = {
      name: process.env.APP_NAME,
      address: process.env.EMAIL_SMTP_USERNAME,
    };
    this.to = to;
  }
}
