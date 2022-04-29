import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { DeleteUsersDto } from 'src/dto/delete-users.dto';
import { UsersService } from './users.service';

@ApiTags("users")
@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({summary: "Получить всех пользователей"})
  @Get()
  async allUsers() {
    return await this.userService.allUsers()
  };

  @ApiOperation({summary: "Получить пользователя по id"})
  @ApiParam({name: "id", example: 1})
  @Get(":id")
  async getUserById(@Param("id") param: string | number) {
    return await this.userService.getUserById(param)
  };

  @ApiOperation({summary: "Создать пользователя"})
  @Post('/createUser')
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.createUser(createUserDTO);
  };

  @ApiOperation({summary: "Создать адмнистратора"})
  @Post('/createAdmin')
  async createAdmin(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.createUser(createUserDTO, "admin");
  };

  @ApiOperation({summary: "Удалить пользователей по id"})
  @Post("deleteUsers")  
  @ApiBody({ type: [Number] })
  async deletUsers(@Body() deleteUsersDto: DeleteUsersDto[]) {
    return this.userService.deleteUsers(deleteUsersDto)
  }
}
