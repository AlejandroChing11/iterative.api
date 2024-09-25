import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateComentarioDto {

  @IsString()
  @MinLength(1)
  @MaxLength(30)
  contenido: string;

}
