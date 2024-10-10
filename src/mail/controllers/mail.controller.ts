import { Controller, Post, Body, Get } from '@nestjs/common';
import { MailService } from '../services/mail.service';
import { MailDto } from '../dto/mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  getMails() {
    return this.mailService.findAll();
  }

  @Post()
  sendMail(@Body() mailDto: MailDto) {
    return this.mailService.create(mailDto);
  }
}
