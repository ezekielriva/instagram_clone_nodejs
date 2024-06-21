import Post from "../../entities/post";
import User from "../../entities/user";

export default class CreatePostUserCase {
    user:User

    constructor(user:User) {
        this.user = user;
    }

    execute(image:string):Post {
        return new Post(this.user, image);
    }
}