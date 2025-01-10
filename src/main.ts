import { NestFactory } from '@nestjs/core';
import { UberLightModule } from './uber-light/adapters/primary/uber-light.module';

async function bootstrap() {
  const app = await NestFactory.create(UberLightModule);
  await app.listen(3000);
}
bootstrap();
