import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookies from 'cookie-parser';
// import {parseEnvOrigins} from './utils/parse-env-origins';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookies());

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
