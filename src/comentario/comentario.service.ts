import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { Comentario } from './entities/comentario.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

import { CreateComentarioDto } from './dto/create-comentario.dto';
import { PublicacionService } from 'src/publicacion/publicacion.service';

@Injectable()
export class ComentarioService {

  constructor(
    @InjectRepository(Comentario)
    private readonly comentarioRepository: Repository<Comentario>,

    private readonly publicacionService: PublicacionService
  ) { }

  async create(createComentarioDto: CreateComentarioDto, usuario: Usuario, publicacionId: string) {

    try {

      const comentario = this.comentarioRepository.create({
        ...createComentarioDto,
        usuario,
        publicacion: await this.publicacionService.findPublicacionById(publicacionId)
      });

      await this.comentarioRepository.save(comentario)

      return comentario;

    } catch (error) {
      throw new BadRequestException(error.message);
    }

  }

  async findAll(usuario: Usuario) {

    const comentarios = await this.comentarioRepository.findBy({
      usuario
    });

    if (comentarios.length === 0) {
      throw new NotFoundException(`El usuario: ${usuario.nombre} no tiene comentarios`);
    }

    return comentarios;

  }

  async findOne(id: string, usuario: Usuario) {

    const comentario = await this.comentarioRepository.findOneBy({
      id,
      usuario
    });

    if (!comentario) {
      throw new NotFoundException(`El comentario con id: ${id} no existe`);
    }

    return comentario;

  }

  async findAllByPublicacion(publicacionId: string, usuario: Usuario) {
    const publicacion = await this.publicacionService.findPublicacionById(publicacionId);

    if (!publicacion) {
      throw new NotFoundException(`La publicación con ID: ${publicacionId} no existe o no tiene permisos`);
    }

    const comentarios = await this.comentarioRepository.find({
      where: {
        publicacion: { id: publicacionId },
        usuario,
      },
    });

    if (comentarios.length === 0) {
      throw new NotFoundException(`La publicación con ID: ${publicacionId} no tiene comentarios`);
    }

    return comentarios;
  }

  async remove(id: string) {

    const comentario = await this.comentarioRepository.findOneBy({ id });

    if (!comentario) {
      throw new NotFoundException(`El comentario con id: ${id} no existe`);
    }

    await this.comentarioRepository.delete(id);

    return `El comentario con id: ${id} ha sido eliminado`;

  }

}
