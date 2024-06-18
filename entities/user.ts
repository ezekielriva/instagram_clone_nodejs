export default class User {
    name: string;
    email: string;
    password: string;
    username: string;
    followers: User[];


    constructor(name:string, email:string, password:string, username: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.username = username;
        this.followers = [];
    }
}