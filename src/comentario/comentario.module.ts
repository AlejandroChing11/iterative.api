import { Module } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { ComentarioController } from './comentario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comentario } from './entities/comentario.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { PublicacionModule } from 'src/publicacion/publicacion.module';

@Module({
  controllers: [ComentarioController],
  providers: [ComentarioService],
  imports: [
    TypeOrmModule.forFeature([Comentario]),
    UsuarioModule,
    PublicacionModule
  ]
})
export class ComentarioModule { }
