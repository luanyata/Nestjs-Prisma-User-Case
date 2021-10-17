import { Post, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async post(postWhereUniqueInput: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.findUnique({ where: postWhereUniqueInput });
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { cursor, orderBy, skip, take, where } = params;

    return this.prisma.post.findMany({
      cursor,
      orderBy,
      skip,
      take,
      where,
    });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({ data });
  }

  async updataPost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;

    return this.prisma.post.update({
      data,
      where,
    });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({ where });
  }
}
