import MailTemplate from './MailTemplate';

export default class UserRegistered extends MailTemplate {
  /**
   * Create an instance of UserRegistered.
   * @param {string} name User name
   * @param {string} address User e-mail address
   * @param {string} token Activation token
   * @memberof UserRegistered
   */
  constructor(name, address, token) {
    super(address);
    this.name = name;
    this.token = token;
  }

  /**
   * Build the mail template
   *
   * @returns {Object} The built mail template
   * @memberof UserRegistered
   */
  build() {
    const url = `${process.env.APP_URL}/auth/activate/${this.token}`;

    return {
      from: `"${this.from.name}" <${this.from.name}>`,
      to: this.to,
      subject: 'Activate your account',
      html: `
        Hello ${this.name},<br><br>
        Thank you for registering. To activate your account, please access the link below:<br><br>
        <a href="${url}">${url}</a><br><br><br>
        <b>Team ${this.from.name}</b>
      `,
    };
  }
}
