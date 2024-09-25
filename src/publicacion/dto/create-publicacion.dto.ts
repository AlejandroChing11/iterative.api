import { IsIn, IsString, MinLength } from "class-validator";

export class CreatePublicacionDto {

  @IsString()
  @IsIn(['imagen', 'video'])
  tipo_publicacion: string;

  @IsString()
  @MinLength(1)
  descripcion: string;

}
