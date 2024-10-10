import { type Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { MAIL_TRANSPORT } from '../constants';

export const MailTransportProvider: Provider = {
  provide: MAIL_TRANSPORT,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return createTransport({
      host: configService.get<string>('EMAIL_HOST'),
      port: Number(configService.get<string>('EMAIL_PORT')),
      secure: true,
      auth: {
        user: configService.get<string>('EMAIL_FROM'),
        pass: configService.get<string>('EMAIL_PASS'),
      },
    });
  },
};
