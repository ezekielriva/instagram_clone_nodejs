import Post from "../../entities/post";
import PostRepository, { TListParams } from "../repositories/post_repository";

export default class ListPostsUseCase {
    protected postRepository:PostRepository;

    constructor(postRepository:PostRepository) {
        this.postRepository = postRepository;
    }

    public execute(params?:TListParams):Post[] {
        if(params) return this.postRepository.List(params);
        return this.postRepository.ListAll();
    }
}