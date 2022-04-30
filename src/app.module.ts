import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';
import { UsersModule } from './users/users.module';
import { FriendshipModule } from './friendship/friendship.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KnexModule.forRoot({
      config: {
        client: "pg",
        useNullAsDefault: true,
        connection: {
          database: process.env.DB_DATABASE,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          port: Number(process.env.DB_PORT),
        }
      }
    }),
    UsersModule,
    FriendshipModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
