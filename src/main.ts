import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 允许来自任何来源的请求访问此 API
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
