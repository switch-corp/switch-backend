import { UseInterceptors } from "@nestjs/common";
import { ApiResponseInterceptor } from "../api-response.interceptor";

export function ApiReponse() {
	return UseInterceptors(new ApiResponseInterceptor());
}