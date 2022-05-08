import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function App() {  
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .setTitle("Social-app")
    .setVersion("1.0.0")
    .build()

  app.enableCors({
    origin: true
  })

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/dock", app, document);
  await app.listen(PORT, () => console.log(`server starting on port: ${PORT}`));
}
App();
