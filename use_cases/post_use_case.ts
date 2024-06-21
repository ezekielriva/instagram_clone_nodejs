import NullPost from "../entities/null_post";
import Post from "../entities/post";
import User from "../entities/user";

export default class PostUseCase {
    ListPostsByUser(user: User) : Post[] {
        return [
            new NullPost(), 
            new NullPost()
        ];
    }
}