import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class InsertUserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(user: Prisma.UserCreateInput) {
    const { password, ...userData } = user;
    const slatRounds = 10;
    const hashedPassword = await bcrypt.hash(password, slatRounds);
    const hashedUserData = { ...userData, password: hashedPassword };

    return this.prisma.user.create({
      data: hashedUserData,
    });
  }
  //

  //get the user by the email
  async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
  //get all users name
  async findAllUsers(name: string) {
    return this.prisma.user.findMany({
      where: {
        name,
      },
    });
  }
}
