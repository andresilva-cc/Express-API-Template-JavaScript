import MailTemplate from './MailTemplate';

export default class UserActivated extends MailTemplate {
  /**
   * Create an instance of UserActivated.
   * @param {string} name User name
   * @param {string} address User e-mail address
   * @memberof UserActivated
   */
  constructor(name, address) {
    super(address);
    this.name = name;
  }

  /**
   * Build the mail template
   *
   * @returns {Object} The built mail template
   * @memberof UserActivated
   */
  build() {
    return {
      from: `"${this.from.name}" <${this.from.name}>`,
      to: this.to,
      subject: `Welcome to ${this.from.name}`,
      html: `
        Hello ${this.name},<br><br>
        Your account has been activated. We hope you enjoy our application.<br><br><br>
        <b>Team ${this.from.name}</b>
      `,
    };
  }
}
