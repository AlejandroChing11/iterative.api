import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioModule } from 'src/usuario/usuario.module';
import { Publicacion } from './entities/publicacion.entity';

import { PublicacionService } from './publicacion.service';
import { PublicacionController } from './publicacion.controller';
import { ContenidoMultimedia } from './entities/contenido-multimedia.entity';

@Module({
  controllers: [PublicacionController],
  providers: [PublicacionService],
  imports: [
    TypeOrmModule.forFeature([Publicacion, ContenidoMultimedia]),
    UsuarioModule
  ]
})
export class PublicacionModule { }
