import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { ValidRoles } from 'src/usuario/interfaces';
import { PublicacionService } from './publicacion.service';
import { Auth } from 'src/usuario/decorators/user.decorator';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { GetUser } from 'src/usuario/decorators/get-user.decorator';

import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';

@Controller('publicaciones')
export class PublicacionController {

  constructor(
    private readonly publicacionService: PublicacionService
  ) { }

  @Auth(ValidRoles.user)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './statics/publicaciones',
        filename: (req, file, cb) => {
          const fileName: string = `${Date.now()}-${file.originalname.replace(/\s/g, '')}`;
          cb(null, fileName);
        }
      })
    })
  )
  create(
    @Body() createPublicacionDto: CreatePublicacionDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: Usuario
  ) {
    const filePath = file ? file.filename : null;
    return this.publicacionService.create(
      createPublicacionDto,
      filePath,
      user
    );
  }

  @Auth(ValidRoles.user)
  @Get()
  findAll(
    @GetUser() usuario: Usuario
  ) {
    return this.publicacionService.findAll(usuario);
  }

  @Auth(ValidRoles.user)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetUser() usuario: Usuario
  ) {
    return this.publicacionService.findById(id, usuario);
  }

  @Auth(ValidRoles.user)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updatePublicacionDto: UpdatePublicacionDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: Usuario
  ) {
    const filePath = file ? file.path : null;
    return this.publicacionService.update(id, updatePublicacionDto, user, filePath);
  }

  @Auth(ValidRoles.user)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @GetUser() user: Usuario
  ) {
    return this.publicacionService.remove(id, user);
  }
}
