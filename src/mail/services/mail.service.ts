import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/render';
import * as nodemailer from 'nodemailer';
import Email from '../templates';
import { MailDto } from '../dto/mail.dto';

interface SendMailConfiguration {
  email: string;
  subject: string;
  text?: string;
  template: any;
}

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>('EMAIL_HOST'),
      port: Number(this.config.get<string>('EMAIL_PORT')),
      secure: true,
      auth: {
        user: this.config.get<string>('EMAIL_FROM'),
        pass: this.config.get<string>('EMAIL_PASS'),
      },
    });
  }

  findAll() {
    return `This action returns all mail`;
  }

  async create(mailDto: MailDto) {
    await this.sendMail({
      email: mailDto.email,
      subject: this.config.get<string>('EMAIL_SUBJECT'),
      template: Email(),
    });

    return 'Email sent successfully';
  }

  private async sendMail({ email, subject, template }: SendMailConfiguration) {
    const html = await render(template);

    await this.transporter.sendMail({
      from: this.config.get<string>('EMAIL_FROM'),
      to: email,
      subject,
      html,
    });
  }
}
