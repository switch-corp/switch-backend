import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		return next.handle().pipe(
			map(data => { 
				return {
					status: context.switchToHttp().getResponse().statusCode,
					message: context.switchToHttp().getResponse().message,
					data: data
				};
			})
		);
	}

}