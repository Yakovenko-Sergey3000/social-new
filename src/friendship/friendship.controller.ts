import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AddInFriendsDto } from 'src/dto/add-in-friend.dto';
import { FriendshipService } from './friendship.service';

@ApiTags("Friends")
@Controller('friendship')
export class FriendshipController {
    constructor(private readonly friendshipService: FriendshipService){};

  @Post("addInFriends/:id")
  @ApiParam({name: "id", description: "Id пользователя который хочет добавить к себе в друзья"})
  async addInFriends(@Param() param: { id: number }, @Body()  data: AddInFriendsDto) {
    return this.friendshipService.addInFriends(Number(param.id), data.userId)
  };
}
