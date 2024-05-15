import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import * as cors from 'cors';
import helmet from 'helmet';
import { ExpressSessionMiddleware } from '@nest-middlewares/express-session';
require('dotenv').config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: process.env.DB_PASSWORD,
    username: 'postgres',
    entities: [User],
    database: 'pruebaOrm',
    synchronize: true,
    logging: true,
  }), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    ExpressSessionMiddleware.configure({secret: process.env.SESSION_SECRET})
    consumer
      .apply(cors(), helmet())
      .forRoutes('auth/login');
  }
}
