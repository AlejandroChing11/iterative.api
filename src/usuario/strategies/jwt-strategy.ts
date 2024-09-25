import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { ExtractJwt, Strategy } from "passport-jwt";

import { Usuario } from "../entities/usuario.entity";
import { JwtPayload } from "../interfaces";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    configService: ConfigService
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate(payload: JwtPayload): Promise<Usuario> {

    const { id } = payload;

    const user = await this.usuarioRepository.findOneBy({ id });

    if (!user) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    if (!user.activo) {
      throw new UnauthorizedException('Usuario no activo, comuniquese con proveedor');
    }

    return user;

  }


}
