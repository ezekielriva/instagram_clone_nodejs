import Post, { NullPost } from "../entities/post";
import User from "../entities/user";

export default class PostUseCase {
    ListPostsByUser(user: User) : Post[] {
        return [
            new NullPost(), 
            new NullPost()
        ];
    }
}