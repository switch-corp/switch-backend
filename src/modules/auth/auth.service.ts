import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../user/dtos/create-user.dto";
import { AuthConfigService } from "src/config/auth/configuration.service";
import * as bcrypt from "bcrypt";
import { UserSignInDto } from "./dtos/user-signin.dto";

@Injectable()
export class AuthService {
	constructor (
        private readonly authConfiguration: AuthConfigService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
	) {}

	async findUser(data: UserSignInDto) {
		const user = await this.userService.findByEmail(data.email).catch(() => { throw new UnauthorizedException("Email ou senha incorretos") });
            
		if(!(await bcrypt.compare(data.password, user.password))) throw new UnauthorizedException("Email ou senha incorretos");

		const payload = { 
			id: user._id, 
			username: user.name, 
			email: user.email, 
		};

		return {
			acess_token: await this.jwtService.signAsync(payload, {
				secret: this.authConfiguration.secret
			})
		};
	}

	async createUser(data: CreateUserDto) {
		const user = await this.userService.createOne(data);
		const payload = { 
			id: user._id, 
			username: user.name, 
			email: user.email
		};

		return {
			acess_token: await this.jwtService.signAsync(payload, {
				secret: this.authConfiguration.secret
			})
		};
	}
}