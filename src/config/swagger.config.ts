import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";

export class SwaggerConfig {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static build(mainModule: any, app: INestApplication, path: string): void {
		const config = new DocumentBuilder()
			.setTitle("Switch API")
			.setDescription("This is the backend of the swith inc.")
			.setVersion("1.0")
			.build();
		const options: SwaggerDocumentOptions = {
			include: [mainModule],
			deepScanRoutes: true
		};
		const document = SwaggerModule.createDocument(app, config, options);
		SwaggerModule.setup(path, app, document);
	}
}