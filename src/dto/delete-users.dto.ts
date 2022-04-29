import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class DeleteUsersDto {
  @ApiProperty({type: Number })
  @IsInt()
  ids: number
}