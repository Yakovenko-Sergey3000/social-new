const bcrypt = require("bcrypt"); // TODO Узнать как переделать в import
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'nestjs-knex';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { userRoles } from "@/enums";

@Injectable()
export class UsersService {
  constructor(@InjectModel() private knex: Knex){}

  async createUser({ email, password, name } : CreateUserDTO, role = "user") {
    const soul = 5;
    const hasPass = await bcrypt.hash(password, soul);
    try {
      const [ user ] = await this.knex("users")
        .insert({ email, password: hasPass, name })
        .returning("id");
      await this.knex("user_roles")
        .insert({ user_id: user.id, role_id: role === "user" ? userRoles.USER : userRoles.ADMIN });

      return new HttpException("Пользователь успешно создан!", HttpStatus.OK);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  async allUsers() {
    return await this.knex("users").select(["id", "name", "email"]);
  }

  async getUserById(id: string | number) {
    return await this.knex("users").select(["id", "name", "email"])
      .where({id})
      .first()
  }
};
