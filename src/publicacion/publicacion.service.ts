import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Publicacion } from './entities/publicacion.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ContenidoMultimedia } from './entities/contenido-multimedia.entity';

import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';

@Injectable()
export class PublicacionService {

  constructor(
    @InjectRepository(Publicacion)
    private publicacionRepository: Repository<Publicacion>,

    @InjectRepository(ContenidoMultimedia)
    private contenidoMultimediaRepository: Repository<ContenidoMultimedia>

  ) { }

  async create(
    createPublicacionDto: CreatePublicacionDto,
    filePath: string,
    user: Usuario
  ) {

    const { descripcion, tipo_publicacion } = createPublicacionDto;

    let contenidoMultimedia = null;
    if (filePath) {
      contenidoMultimedia = this.contenidoMultimediaRepository.create({
        url: filePath,
      });

      await this.contenidoMultimediaRepository.save(contenidoMultimedia);
    }

    const publicacion = this.publicacionRepository.create({
      descripcion,
      tipo_publicacion,
      usuario: user,
      contenido_multimedia: contenidoMultimedia
    })

    await this.publicacionRepository.save(publicacion);

    return {
      descripcion: publicacion.descripcion,
      tipo_publicacion: publicacion.tipo_publicacion,
      fecha_publicacion: publicacion.fecha_publicacion,
      contenido_multimedia: publicacion.contenido_multimedia
    };

  }

  async findAll(usuario: Usuario) {

    const publicaciones = await this.publicacionRepository.find({
      where: {
        usuario
      }
    })

    if (publicaciones.length === 0) {
      throw new NotFoundException(`El usuario ${usuario.nombre}, no tiene publicaciones aun`);
    }

    return publicaciones;

  }

  async findById(id: string, usuario: Usuario) {
    const publicacion = await this.publicacionRepository.findOne({
      where: {
        id,
        usuario
      }
    });

    if (!publicacion) {
      throw new NotFoundException(`Publicacion con el id:${id}, no fue encontrada`);
    }

    return publicacion;
  }

  async update(
    id: string,
    updatePublicacionDto: UpdatePublicacionDto,
    user: Usuario,
    filePath?: string
  ) {

    const publicacion = await this.publicacionRepository.preload({
      id: id,
      usuario: user
    })

    if (!publicacion) {
      throw new NotFoundException(`Publicacion con el id:${id}, no fue encontrada`);
    }

    const { descripcion, tipo_publicacion } = updatePublicacionDto;

    publicacion.descripcion = descripcion;
    publicacion.tipo_publicacion = tipo_publicacion;

    if (filePath) {
      let contenidoMultimedia = publicacion.contenido_multimedia;
      if (contenidoMultimedia) {
        contenidoMultimedia.url = filePath;
        await this.contenidoMultimediaRepository.save(contenidoMultimedia);
      }
    }

    await this.publicacionRepository.save(publicacion);

    return {
      descripcion: publicacion.descripcion,
      tipo_publicacion: publicacion.tipo_publicacion,
      fecha_publicacion: publicacion.fecha_publicacion,
      contenido_multimedia: publicacion.contenido_multimedia
    };;



  }

  async remove(id: string, user: Usuario) {
    const publicacion = await this.publicacionRepository.findOne({
      where: {
        id: id,
        usuario: user
      }
    });

    if (!publicacion) {
      throw new NotFoundException(`Publicacion con el id:${id}, no fue encontrada`);
    }

    await this.publicacionRepository.remove(publicacion);

    return {
      message: `Publicacion con el id:${id}, fue eliminada`
    };
  }
}
