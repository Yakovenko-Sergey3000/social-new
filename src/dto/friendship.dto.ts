import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class FriendshipDto {
  @ApiProperty({
    description: "Id пользователя с которым будут производиться манипуляции"
  })
  @IsInt()
  @IsNotEmpty()
  userId: number
}