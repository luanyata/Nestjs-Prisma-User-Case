import { Post as PostModel, User as UserModel } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PostService } from './post.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Get('posts/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id });
  }

  @Get('feeds')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({ where: { publish: true } });
  }

  @Get('filtered-posts/:serchString')
  async getFilteredPosts(
    @Param('serchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          { title: { contains: searchString } },
          { content: { contains: searchString } },
        ],
      },
    });
  }

  @Post('posts')
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<PostModel> {
    const { authorEmail, title, content } = postData;

    return this.postService.createPost({
      title,
      content,
      author: { connect: { email: authorEmail } },
    });
  }

  @Post('users')
  async signupUser(
    @Body() userData: { name: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('publish/:id')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updataPost({
      where: { id },
      data: { publish: true },
    });
  }

  @Delete('posts/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id });
  }
}
