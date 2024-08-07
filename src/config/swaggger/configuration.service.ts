import { INestApplication, Injectable } from "@nestjs/common";
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";

@Injectable()
export class SwaggerConfigService {
	build(mainModule: any, app: INestApplication, path: string): void {
		const config = new DocumentBuilder()
			.setTitle("Switch API")
			.setDescription("This is the backend of the swith inc.")
			.setVersion("1.0")
			.addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT", in: "header" }, "bearer")
			.addSecurityRequirements("bearer")
			.build();
		const options: SwaggerDocumentOptions = {
			include: [mainModule],
			deepScanRoutes: true
		};
		const document = SwaggerModule.createDocument(app, config, options);
		SwaggerModule.setup(path, app, document);
	}
}