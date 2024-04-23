import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { SwaggerConfig } from "./config/swagger.config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("/api/v1");
	app.useGlobalPipes(new ValidationPipe());
	SwaggerConfig.build(AppModule, app, "/");
	await app.listen(8080);
}
bootstrap();
