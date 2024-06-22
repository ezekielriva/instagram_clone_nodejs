import { randomBytes } from "crypto";
import User from "../../entities/user";

export function BuildUser():User {
    var name: string = crypto.randomUUID();
    var email: string =  crypto.randomUUID();
    var password: string =  crypto.randomUUID();
    var username: string =  crypto.randomUUID();
    
    var user:User = new User(name, email, password, username);

    user.id = crypto.randomUUID();

    return user;
}