/* eslint-disable no-mixed-spaces-and-tabs */
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { isPublic } from "./decorators/isPulic.decorator";
import { AuthService } from "./auth.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpDescriptions } from "src/common/enums/http-descriptions.enum";
import { CreateUserDto } from "../user/dtos/create-user.dto";
import { UserSignInDto } from "./dtos/user-signin.dto";

@isPublic()
@Controller("/auth")
@ApiTags("Auth")
export class AuthController {
	constructor (
        private readonly authService: AuthService
	) {}
    
    @Post("/signin")
    @HttpCode(200)
    @ApiResponse({ status:  HttpStatus.OK, description: HttpDescriptions.OK })
    @ApiResponse({ status:  HttpStatus.NOT_FOUND, description: HttpDescriptions.NOT_FOUND })
    @ApiResponse({ status:  HttpStatus.BAD_REQUEST, description: HttpDescriptions.BAD_REQUEST })
	signIn(@Body() request: UserSignInDto) {
		return this.authService.findUser(request);
	}

    @Post("/signup")
    @HttpCode(201)
    @ApiResponse({ status:  HttpStatus.OK, description: HttpDescriptions.OK })
    @ApiResponse({ status:  HttpStatus.BAD_REQUEST, description: HttpDescriptions.BAD_REQUEST })
    signUp(@Body() request: CreateUserDto) {
    	return this.authService.createUser(request);
    }
}