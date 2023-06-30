import { Module } from '@nestjs/common';
import { InsertUserService } from './insert_user.service';
import { InsertUserController } from './insert_user.controller';
import { PrismaService } from 'prisma/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // inset a work  that is used to create the encoded jwt token which
    // is made out of id and this word
    JwtModule.register({
      global: true,
      secret: process.env.PASSWORD,
      signOptions: { expiresIn: '2min' },
    }),
  ],
  controllers: [InsertUserController],
  providers: [InsertUserService, PrismaService],
})
export class InsertUserModule {}
