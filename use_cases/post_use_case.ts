import Post from "../entities/post";
import User from "../entities/user";

export default class PostUseCase {
    CreatePost(user: User, image: string) {
        return new Post(user, image);
    }
}