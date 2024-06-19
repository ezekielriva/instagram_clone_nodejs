import EncryptDectyptPassword from "../services/encrypt_decrypt_password";

export default class User {
    id: number | null;
    name: string;
    email: string;
    password: string;
    username: string;
    followers: User[];


    constructor(name:string, email:string, password:string, username: string) {
        this.id = null;
        this.name = name;
        this.email = email;
        this.password = EncryptDectyptPassword.encrypt(password);
        this.username = username;
        
        this.followers = [];
    }
}