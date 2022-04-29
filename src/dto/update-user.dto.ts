import { ApiProperty, getSchemaPath } from "@nestjs/swagger"
import { IsInt, IsObject } from "class-validator"

export class UpdateUserDto {
  @ApiProperty({
    example: 1,
    description: "Id пользователя"
  })
  @IsInt()
  id: number
  @ApiProperty({
    properties: {
     name: {
       type: 'string',
       example: "Василий",
       description: "Имя пользователя"
     } 
    }
  })
  @IsObject()
  params: object
}