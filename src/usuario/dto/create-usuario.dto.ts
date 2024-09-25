import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsPositive, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class CreateUsuarioDto {

  @ApiProperty({
    description: 'Nombre del usuario',
    type: String,
  })
  @IsString()
  @MinLength(3)
  nombre: string;

  @ApiProperty({
    description: 'email del usuario',
    type: String,
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'telefono del usuario',
    type: String,
  })
  @IsPhoneNumber('CO')
  @IsPositive()
  telefono: string;

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
