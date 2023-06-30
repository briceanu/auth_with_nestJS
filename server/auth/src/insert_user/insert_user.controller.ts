import {
  Controller,
  Response,
  Post,
  Get,
  Body,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { InsertUserService } from './insert_user.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RouteGuard } from 'src/route/route.guard';

@Controller()
export class InsertUserController {
  constructor(
    private readonly insertUsers: InsertUserService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  create(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user: Prisma.UserCreateInput = {
      name,
      email,
      password,
    };

    return this.insertUsers.create(user);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Response() res: any,
  ) {
    //here we find the user by email
    const user = await this.insertUsers.findByEmail(email);
    // if we don't find the use we throw an error
    if (!user) {
      throw new BadRequestException('invalid credentials email');
    }
    //password is not hashed but user.password is saved in DB and is hashed
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }
    //  return user.password  returns the hashed password
    //now we generate jwt token
    const jwtToken = await this.jwtService.signAsync({ id: user.id });
    //here we get the token
    // return jwt;
    // return jwt  to the client
    res.json({ token: jwtToken });
    // Sending the token in the response
  }
  @UseGuards(RouteGuard)
  @Get('secretPage')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async secretPage(name: string, @Response() res: any) {
    const data = await this.insertUsers.findAllUsers(name);
    res.json({ data });
  }
}
