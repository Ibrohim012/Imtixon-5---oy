import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  
  app.use(cookieParser());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
  });


  const config = new DocumentBuilder()
    .setTitle('Yandex Eats API')
    .setDescription('Yandex Eats loyihasi uchun API hujjatlari')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  app.use(session({
    secret: 'jumavoy', 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, 
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000, ()=>{console.log("Server has been running on port ", 3000)});
}
bootstrap();
