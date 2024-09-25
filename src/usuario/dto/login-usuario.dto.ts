import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginUsuarioDto {

  @ApiProperty({
    description: 'email del usuario',
    type: String,
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'contraseña del usuario',
    type: String,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe tener al menos una mayuscula, una minuscula y un numero'
  })
  contraseña: string;

}
