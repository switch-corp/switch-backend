import { ObjectId } from "mongoose";


export interface CraeteUserGroupInterface {
    name: string;

    users: string[];

    schedules: string[];

    rooms: string[];

    switches: string[];

    isUser: boolean;
}