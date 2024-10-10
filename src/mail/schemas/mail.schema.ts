import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MailDocument = HydratedDocument<Mail>;

@Schema()
export class Mail {
  @Prop()
  name: string;

  @Prop()
  email: string;
}

export const MailSchema = SchemaFactory.createForClass(Mail);
