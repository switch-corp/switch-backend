import { UseInterceptors } from "@nestjs/common";
import { ApiResponseInterceptor } from "../api-response.interceptor";

export function ApiReponseDecorator() {
	return UseInterceptors(new ApiResponseInterceptor());
}