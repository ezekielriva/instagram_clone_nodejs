import Image, { TImageParams } from "../../entities/image";
import Post from "../../entities/post";
import User from "../../entities/user";
import PostRepository from "../repositories/post_repository";

export default class CreatePostUserCase {
    user:User
    postRepository:PostRepository;

    constructor(user:User, postRepository:PostRepository) {
        this.user = user;
        this.postRepository = postRepository;
    }

    execute(imageParams:TImageParams):Post {
        var image:Image = new Image(imageParams);
        var post:Post = new Post(this.user, image);

        return this.postRepository.Create(post);
    }
}