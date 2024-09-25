import { Controller, Post, Body } from '@nestjs/common';

import { UsuarioService } from './usuario.service';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @ApiResponse({
    status: 201,
    description: 'Registrado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @Post('register')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Autenticado exitosamente',
  })
  @ApiResponse({
    status: 403,
    description: 'Token Expirado',
  })
  @Post('login')
  login(@Body() loginUsuarioDto: LoginUsuarioDto): Promise<{ token: string }> {
    return this.usuarioService.login(loginUsuarioDto);
  }

}
