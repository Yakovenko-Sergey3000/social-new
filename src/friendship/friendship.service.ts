import { statusFriends } from '@/enums';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'nestjs-knex';
import { AddInFriendsDto } from 'src/dto/add-in-friend.dto';

@Injectable()
export class FriendshipService {
  constructor(@InjectModel() private knex: Knex){};

  async addInFriends({userOne, userTwo}: AddInFriendsDto) {
    try {
      const candidate = await this.isFriendship(userOne, userTwo);
      if ( candidate.length ) {
        return new HttpException("Пользователь у вас в друзьях", HttpStatus.BAD_REQUEST);
      }
      
      await this.knex("friendship").insert({
        user_one: userOne,
        user_two: userTwo
      })

     return new HttpException("Запрос отправлен", HttpStatus.OK);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  async isFriendship(oneId: number, twoId: number) {
    return await this.knex("users as u")
      .leftJoin("friendship as f", "u.id", "f.user_one")
      .where({ "f.status": 1, "u.id": oneId , "f.user_two": twoId })
      .union(
        this.knex("users as u")
          .leftJoin("friendship as f", "u.id", "f.user_two")
          .where({"f.status": 1, "u.id": oneId, "f.user_one": twoId })
      )
  };
}
