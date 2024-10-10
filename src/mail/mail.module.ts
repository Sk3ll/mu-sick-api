import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailSchema, Mail } from './schemas/mail.schema';
import { MailService } from './services/mail.service';
import { MailController } from './controllers/mail.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mail.name, schema: MailSchema }]),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
