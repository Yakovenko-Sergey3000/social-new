import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddInFriendsDto } from 'src/dto/add-in-friend.dto';
import { FriendshipService } from './friendship.service';

@ApiTags("Friends")
@Controller('friendship')
export class FriendshipController {
    constructor(private readonly friendshipService: FriendshipService){};

  
  @Post("addInFriends")
  async addInFriends(@Body() data: AddInFriendsDto) {
     return this.friendshipService.addInFriends(data)
  };
}
