import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateComentarioDto {

  @ApiProperty({
    description: 'contenido del comentario',
    type: String,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  contenido: string;

}
