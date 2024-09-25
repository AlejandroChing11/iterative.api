import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsString, MinLength } from "class-validator";

export class CreatePublicacionDto {

  @ApiProperty({
    description: 'tipo de publicacion',
    type: String,
    default: 'imagen',
    enum: ['imagen', 'video']
  })
  @IsString()
  @IsIn(['imagen', 'video'])
  tipo_publicacion: string;

  @ApiProperty({
    description: 'descripcion de la publicacion',
    type: String,
  })
  @IsString()
  @MinLength(1)
  descripcion: string;

}
