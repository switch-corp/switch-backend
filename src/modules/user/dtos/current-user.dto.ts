import { CurrentUserInterace } from "../interfaces/current-user.interface";

export class CurrentUserDto implements CurrentUserInterace {
    id: string;
    username: string;
    email: string;
}