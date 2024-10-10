import { Controller, Post, Body, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MailService } from '../services/mail.service';
import { MailDto } from '../dto/mail.dto';

@ApiTags('Mails')
@Controller('mails')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get emails successfully',
  })
  @Get()
  getMails() {
    return this.mailService.findAll();
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Email registered into database and email sent successfully',
  })
  @Post('/register')
  register(@Body() mailDto: MailDto) {
    return this.mailService.create(mailDto);
  }
}
