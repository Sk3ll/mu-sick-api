import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MailDocument = HydratedDocument<Mail>;

@Schema({ timestamps: true, versionKey: false })
export class Mail {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;
}

export const MailSchema = SchemaFactory.createForClass(Mail);
