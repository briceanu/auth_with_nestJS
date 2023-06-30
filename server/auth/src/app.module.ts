import { Module } from '@nestjs/common';
import { InsertUserModule } from './insert_user/insert_user.module';
import { PrismaService } from 'prisma/prisma/prisma.service';

@Module({
  imports: [InsertUserModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
