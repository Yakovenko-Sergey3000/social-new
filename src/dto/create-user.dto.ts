import { ApiExtension, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator'

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: "Email пользователя",
    example: "user@mail.ru"
  })
  email: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Пароль",
    example: "123456",
    minLength: 6
  })
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "Alex",
    description: "Имя пользователя"
  })
  name: string
}