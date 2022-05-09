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
      const friendship = await this.isFriendship(userOne, userTwo);

      if ( friendship.status === statusFriends.ADDED ) {
        return new HttpException("Пользователь у вас в друзьях", HttpStatus.BAD_REQUEST);
      } else if ( friendship.status === statusFriends.FOLLOWER ) {
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

  async getFriends(id: number) {
    return await this.knex("friendship as f")
      .leftJoin("users as u", "f.user_two", "u.id")
      .where({"f.user_one" : id , "f.status": statusFriends.ADDED })
      .select(["u.id", "u.name", "u.email"])
      .union(
        this.knex("friendship as f")
        .leftJoin("users as u", "f.user_one", "u.id")
        .where({"f.user_two" : id , "f.status": statusFriends.ADDED })
        .select(["u.id", "u.name", "u.email"])
      )
  };

  async getFollowers(id: number) {
    return await this.knex("friendship as f")
      .leftJoin("users as u", "f.user_one", "u.id")
      .where({"f.user_two" : id , "f.status": statusFriends.FOLLOWER })
      .select(["u.id", "u.name", "u.email"])
  };

  async isFriendship(oneId: number, twoId: number) {
    return await this.knex("friendship")
      .where({"user_one": oneId,"user_two": twoId })
      .whereNot("status", statusFriends.REJECT)
      .orWhere({"user_one": twoId,"user_two": oneId })
      .whereNot("status", statusFriends.REJECT)
      .first()
  };
};