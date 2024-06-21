import Image, { TImageParams } from "../../entities/image";
import Post from "../../entities/post";
import User from "../../entities/user";

export default class CreatePostUserCase {
    user:User

    constructor(user:User) {
        this.user = user;
    }

    execute(imageParams:TImageParams):Post {
        var image:Image = new Image(imageParams);
        var post:Post = new Post(this.user, image);
        
        return post;
    }
}