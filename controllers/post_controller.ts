import { Request, Response } from "express";
import Post from "../entities/post";
import CreatePostUserCase from "../use_cases/create_post_use_case";
import { TImageParams } from "../entities/image";
import ListPostsUseCase from "../use_cases/list_posts_use_case";
import PostRepository from "../adapters/memory/post_repository";

export default class PostController {
    public static Post(req:Request, res:Response) {
        var repository:PostRepository = PostRepository.getInstance();
        var useCase:CreatePostUserCase = new CreatePostUserCase(req.session.currentUser!, repository);        
        var post:Post = useCase.execute(req.file as TImageParams);

        res.send({ post: post });
    }

    public static Index(req: Request, res: Response) {
        var repository:PostRepository = PostRepository.getInstance();
        var useCase:ListPostsUseCase = new ListPostsUseCase(repository);
        var posts : Post[] = useCase.execute({ UserId: req.params.userId });
    
        res.send({ posts: posts })
    }
}