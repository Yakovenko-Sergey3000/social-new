import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class AddInFriendsDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  userOne: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  userTwo: number
}