import { PostService } from './post.service';
import { PrismaService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PostService, PrismaService, UserService],
})
export class AppModule {}
