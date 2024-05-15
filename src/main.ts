import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { doubleCsrf } from 'csrf-csrf';
import { strict } from 'assert';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
const session = require('express-session');
require('dotenv').config();

console.log(process.env.SESSION_SECRET);

var cookieParser = require('cookie-parser')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
    .use(helmet())
    .use(session({secret: process.env.SESSION_SECRET}))
    .use(passport.initialize())
    .use(passport.session())
    .useGlobalPipes(new ValidationPipe())
    .enableCors();
  await app.listen(3000);
}
bootstrap();
