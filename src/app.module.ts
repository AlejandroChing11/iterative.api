import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsuarioModule } from './usuario/usuario.module';
import { ComentarioModule } from './comentario/comentario.module';
import { PublicacionModule } from './publicacion/publicacion.module';

import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      autoLoadEntities: true,
      synchronize: true
    }),
    UsuarioModule,
    PublicacionModule,
    ComentarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
