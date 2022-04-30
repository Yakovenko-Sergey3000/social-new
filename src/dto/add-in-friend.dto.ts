import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class AddInFriendsDto {
  @ApiProperty({
    description: "Id пользователя которого хотя добавить в друзья"
  })
  @IsInt()
  @IsNotEmpty()
  userId: number
}