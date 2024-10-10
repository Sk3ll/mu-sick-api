import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/render';
import { Transporter } from 'nodemailer';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import Email from '../templates';
import { MailDto } from '../dto/mail.dto';
import { Mail, MailDocument } from '../schemas/mail.schema';
import { InjectTransporter } from '../decorators';

interface SendMailConfiguration {
  email: string;
  subject: string;
  text?: string;
  template: any;
}

@Injectable()
export class MailService {
  constructor(
    private readonly config: ConfigService,
    @InjectModel(Mail.name) private readonly mailModel: Model<Mail>,
    @InjectTransporter() private readonly transporter: Transporter,
  ) {}

  public findAll(): Promise<MailDocument[]> {
    return this.mailModel.find().exec();
  }

  public async create(mailDto: MailDto): Promise<string> {
    await this.mailModel.create(mailDto);

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
