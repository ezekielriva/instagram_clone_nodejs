import EncryptDectyptPassword from "../services/crypto/encrypt_decrypt_password";

export type TUserID = string | number | null;

export default class User {
    id: TUserID;
    name: string;
    email: string;
    password: string;
    username: string;

    auth_token?:string;
    auth_token_exp?:number;


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

export class NullUser extends User {
    constructor() {
        super("","","","");
    }
}