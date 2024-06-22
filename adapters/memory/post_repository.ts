import Post from "../../entities/post"
import IPostRepository, { TListParams } from "../../use_cases/repositories/post_repository"

export default class PostRepository implements IPostRepository {
    private static instance:PostRepository;
    private posts:Post[] = [];

    public static getInstance():PostRepository {
        if(!PostRepository.instance) {
            PostRepository.instance = new PostRepository();
        }

        return PostRepository.instance;
    }

    Create(post: Post): Post {
        post.id = crypto.randomUUID();
        this.posts.push(post);
        return post;
    }

    List(params:TListParams): Post[] {
        return this.posts.filter( (post) => {
            return post.user.id == params.UserId;
        });
    }

    ListAll(): Post[] {
        return this.posts;
    }
};
