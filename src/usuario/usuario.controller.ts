import { Controller, Post, Body } from '@nestjs/common';

import { UsuarioService } from './usuario.service';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Controller('auth')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post('register')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Post('login')
  login(@Body() loginUsuarioDto: LoginUsuarioDto): Promise<{ token: string }> {
    return this.usuarioService.login(loginUsuarioDto);
  }

}
