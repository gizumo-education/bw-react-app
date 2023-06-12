import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { generateDataFile } from './utils/generateDataFile'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  generateDataFile()
  await app.listen(3000)
}
bootstrap()
