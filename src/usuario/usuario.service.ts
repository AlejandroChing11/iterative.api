import { BadRequestException, Injectable, InternalServerErrorException, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from './entities/usuario.entity';
import { JwtPayload } from './interfaces';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto) {

    try {

      const { contraseña, ...userData } = createUsuarioDto;

      const usuario = this.usuarioRepository.create({
        ...userData,
        contraseña: bcrypt.hashSync(contraseña, 10)
      });

      await this.usuarioRepository.save(usuario);

      return {
        ...usuario,
        token: this.getJwtToken({ id: usuario.id })
      }

    } catch (err) {
      this.handleDBError(err);
    }
  }

  async login(loginUsuarioDto: LoginUsuarioDto): Promise<{ token: string }> {

    const { contraseña, email } = loginUsuarioDto;

    const user = await this.usuarioRepository.findOne({
      where: { email },
      select: { email: true, contraseña: true, id: true }
    })

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    if (!bcrypt.compareSync(contraseña, user.contraseña)) {
      throw new BadRequestException('Contraseña incorrecta');
    }

    return {
      token: this.getJwtToken({ id: user.id })
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBError(error: any): never {
    if (error.code === '23505') {
      throw new InternalServerErrorException('Usuario ya existe');
    }
    throw new BadRequestException({ message: 'Error en la base de datos', error: error.message });
  }

}
