import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); // If you need to access .env values during app boot
  const port = configService.get<number>('PORT') || 3000; //access during the app boot
  await app.listen(port);
  console.log(`User Service is running on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
