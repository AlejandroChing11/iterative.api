import { IsEmail, IsPhoneNumber, IsPositive, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class CreateUsuarioDto {

  @IsString()
  @MinLength(3)
  nombre: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsPhoneNumber('CO')
  @IsPositive()
  telefono: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe tener al menos una mayuscula, una minuscula y un numero'
  })
  contraseña: string;

}
