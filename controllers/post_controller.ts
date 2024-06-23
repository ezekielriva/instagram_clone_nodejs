import { Request, RequestHandler, Response } from "express";
import Post from "../entities/post";
import CreatePostUserCase from "../use_cases/create_post_use_case";
import { TImageParams } from "../entities/image";
import ListPostsUseCase from "../use_cases/list_posts_use_case";
import PostRepository from "../adapters/memory/post_repository";

const Create:RequestHandler = function(req:Request, res:Response) {
    var repository:PostRepository = PostRepository.getInstance();
    var useCase:CreatePostUserCase = new CreatePostUserCase(req.session.currentUser!, repository);        
    var post:Post = useCase.execute(req.file as TImageParams);

    res.send({ post: post });
}

const Index:RequestHandler = function(req: Request, res: Response) {
    var repository:PostRepository = PostRepository.getInstance();
    var useCase:ListPostsUseCase = new ListPostsUseCase(repository);
    var posts : Post[] = useCase.execute({ UserId: req.params.userId });

    res.send({ posts: posts })
}

export default {
    Create,
    Index
}