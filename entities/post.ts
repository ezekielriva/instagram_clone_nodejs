import User from "./user";

export default class Post {
    user: User;
    image: string;

    constructor(user: User, image: string) {
        this.user = user;
        this.image = image;
    }
}