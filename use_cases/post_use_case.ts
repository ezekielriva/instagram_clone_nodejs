import NullPost from "../entities/null_post";
import Post from "../entities/post";
import User from "../entities/user";

export default class PostUseCase {
    CreatePost(user: User, image: string) : Post {
        return new Post(user, image);
    }

    ListPostsByUser(user: User) : Post[] {
        return [
            new NullPost(), 
            new NullPost()
        ];
    }
}