import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class MailDto {
  @ApiProperty({
    default: 'Vlad',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    default: 'vlad.grinevich1@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
