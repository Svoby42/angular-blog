import { Role } from "./role.enum";

export class User{
    id: number | undefined;
    username: string = "";
    password: string = "";
    name: string = "";
    token: string = "";
    create_time: Date = new Date;
    last_login: Date = new Date;
    role: Role = Role.USER;
}
