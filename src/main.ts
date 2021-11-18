import { NestFactory } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import ReDoc from './reDoc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService: PrismaService = app.get(PrismaService);

  prismaService.enableShutdownHooks(app);

  prismaService.$on<any>('query', (event: Prisma.QueryEvent) => {
    console.log('Hora: ' + new Date().toISOString());
    console.log('Query: ' + event.query);
    console.log('Duration: ' + event.duration + 'ms');
  });

  const PORT = process.env.PORT || 3000;

  await ReDoc.execute(app);

  await app.listen(PORT);

  console.log(`Server runner to port ${PORT}`);
}
bootstrap();
