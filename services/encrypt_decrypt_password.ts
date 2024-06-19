import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export default class EncryptDectyptPassword {
    static readonly saltRounds:number = 10;

    public static encrypt(password:string):string {
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);
        return hash;
    }

    public static compare(password:string,hash:string):boolean {
        return compareSync(password, hash);
    }
}