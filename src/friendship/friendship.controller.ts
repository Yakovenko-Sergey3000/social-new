import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiParam, ApiTags, ApiOperation } from '@nestjs/swagger';
import { FriendshipDto } from 'src/dto/friendship.dto';
import { FriendshipService } from './friendship.service';

@ApiTags("Friends")
@Controller('friendship')
export class FriendshipController {
    constructor(private readonly friendshipService: FriendshipService){};

  @Post("addInFriends/:id")
  @ApiOperation({summary: "Добавление в друзья"})
  @ApiParam({name: "id", description: "Id пользователя который хочет добавить к себе в друзья"})
  async addInFriends(@Param() param: { id: number }, @Body()  data: FriendshipDto) {
    return this.friendshipService.addInFriends(Number(param.id), data.userId)
  };

  @Post("deleteFromFriends/:id")
  @ApiOperation({summary: "Удаление из друзей"})
  @ApiParam({name: "id", description: "Id пользователя который хочет удалить друга"})
  async deleteFromFriends(@Param() param: { id: number }, @Body() data: FriendshipDto) {
    return this.friendshipService.deleteFromFriends(Number(param.id), data.userId)
  };
}
