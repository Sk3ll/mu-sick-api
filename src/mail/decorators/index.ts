import { Inject } from '@nestjs/common';
import { MAIL_TRANSPORT } from '../constants';

export const InjectTransporter = () => Inject(MAIL_TRANSPORT);
