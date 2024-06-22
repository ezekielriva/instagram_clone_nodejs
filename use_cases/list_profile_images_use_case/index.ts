import PostRepository from "../../adapters/memory/post_repository";
import Post from "../../entities/post";
import User from "../../entities/user";
import ListPostsUseCase from "../list_posts_use_case";

export default class ListProfileImagesUseCase extends ListPostsUseCase {
    user:User;

    constructor(postRepository:PostRepository, user:User) {
        super(postRepository);
        this.user = user;
    }

    public execute(): Post[] {
        return this.postRepository.List({ UserId: this.user.id });
    }
};