import { statusFriends } from '@/enums';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'nestjs-knex';

@Injectable()
export class FriendshipService {
  constructor(@InjectModel() private knex: Knex){};

  async addInFriends(userOne: number, userTwo : number) {
    try {
      const status = await this.isFriendship(userOne, userTwo);

      if ( status === statusFriends.ADDED ) {
        return new HttpException("Пользователь у вас в друзьях", HttpStatus.BAD_REQUEST);
      } else if ( status === statusFriends.FOLLOWER ) {
        return new HttpException("Заявка уже отправлена", HttpStatus.BAD_REQUEST);
      }
      
      await this.knex("friendship").insert({
        user_one: userOne,
        user_two: userTwo
      });

     return new HttpException("Запрос отправлен", HttpStatus.OK);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  async deleteFromFriends(userOne: number, userTwo : number) {
    try {
      const friendship = await this.isFriendship(userOne, userTwo)
      
      if (!friendship) {
        return new HttpException("Пользователь не добавлен в друзья", HttpStatus.BAD_REQUEST);
      }
      
      await this.knex("friendship")
        .update({
          status: statusFriends.REJECT,
          deleteAt: new Date()
        })

      return new HttpException("Пользователь удален", HttpStatus.OK);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  async isFriendship(oneId: number, twoId: number) {
    // const res = await this.knex("users as u")
      // .leftJoin("friendship as f", "u.id", "f.user_one")
      // .where({ "f.status": statusFriends.ADDED, "u.id": oneId , "f.user_two": twoId })
      // .orWhere({"f.status": statusFriends.FOLLOWER, "u.id": oneId , "f.user_two": twoId })
      // .union(
      //   this.knex("users as u")
      //     .leftJoin("friendship as f", "u.id", "f.user_two")
      //     .where({"f.status": statusFriends.ADDED, "u.id": oneId, "f.user_one": twoId })
      //     .orWhere({"f.status": statusFriends.FOLLOWER, "u.id": oneId , "f.user_two": twoId })
      // )
      // .first()
    return await this.knex("friendship")
      .where({"user_one": oneId,"user_two": twoId })
      .whereNot("status", statusFriends.REJECT)
      .orWhere({"user_one": twoId,"user_two": oneId })
      .whereNot("status", statusFriends.REJECT)
      .first()
  };
};
