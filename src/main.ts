import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import {
  version as pkgJsonVersion,
  description as pkgDescription,
  name as pkgName,
} from '../package.json';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api', { exclude: ['api-docs'] });

  const config = new DocumentBuilder()
    .setTitle(pkgName)
    .setDescription(pkgDescription)
    .setVersion(pkgJsonVersion)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      transformOptions: {
        enableImplicitConversion: true,
        exposeUnsetFields: false,
      },
    }),
  );

  app.use(helmet());
  const corsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  };

  app.enableCors(corsOptions);

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  const host = configService.get<string>('HOST');

  await app.listen(port, '', () => {
    Logger.log(`Server is running on: http://${host}:${port}`);
  });
}

bootstrap();
