import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/render';
import * as nodemailer from 'nodemailer';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import Email from '../templates';
import { MailDto } from '../dto/mail.dto';
import { Mail, MailDocument } from '../schemas/mail.schema';

interface SendMailConfiguration {
  email: string;
  subject: string;
  text?: string;
  template: any;
}

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly config: ConfigService,
    @InjectModel(Mail.name) private readonly mailModel: Model<Mail>,
  ) {
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

  public findAll(): Promise<MailDocument[]> {
    return this.mailModel.find().exec();
  }

  public async create(mailDto: MailDto): Promise<string> {
    const createdMail = new this.mailModel(mailDto);
    await createdMail.save();

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
