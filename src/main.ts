import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { SwaggerConfig } from "./config/swagger.config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	SwaggerConfig.build(AppModule, app, "/");
	await app.listen(8080);
}
bootstrap();
