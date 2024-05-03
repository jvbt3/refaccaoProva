import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './middleware/middleware';
import { UsuarioController } from './usuario/usuario.controller';
import { CursosModule } from './cursos/cursos.module';
import { AuthModule } from './auth/auth.module';
import { TimeoutMiddleware } from './middleware/req-time.middleware';

@Module({
  imports: [UsuarioModule, MongooseModule.forRoot('mongodb://localhost/prova'), CursosModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({path: '*', method: RequestMethod.POST});
      consumer.apply(TimeoutMiddleware).forRoutes('auth')
  }
}
