import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ComentarioService } from './comentario.service';

import { Auth } from 'src/usuario/decorators/user.decorator';
import { Usuario } from 'src/usuario/entities/usuario.entity';

import { ValidRoles } from 'src/usuario/interfaces';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { GetUser } from 'src/usuario/decorators/get-user.decorator';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comentarios')
@Controller('comentarios')
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) { }

  @Auth(ValidRoles.user)
  @Post(':publicacionId')
  create(
    @Param('publicacionId') publicacionId: string,
    @Body() createComentarioDto: CreateComentarioDto,
    @GetUser() usuario: Usuario
  ) {
    return this.comentarioService.create(createComentarioDto, usuario, publicacionId);
  }

  @Auth(ValidRoles.user)
  @Get()
  findAll(@GetUser() usuario: Usuario) {
    return this.comentarioService.findAll(usuario);
  }

  @Auth(ValidRoles.user)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetUser() usuario: Usuario
  ) {
    return this.comentarioService.findOne(id, usuario);
  }

  @Auth(ValidRoles.user)
  @Get('publicacion/:publicacionId')
  findAllByPublicacion(
    @Param('publicacionId') publicacionId: string,
    @GetUser() usuario: Usuario
  ) {
    return this.comentarioService.findAllByPublicacion(publicacionId, usuario);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comentarioService.remove(id);
  }
}
