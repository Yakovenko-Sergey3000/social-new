import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class DeleteUsersDto {
  @ApiProperty()
  @IsInt()
  id: number
}