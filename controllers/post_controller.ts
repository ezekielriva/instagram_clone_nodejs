import { Request, Response } from "express";
import Post from "../entities/post";
import CreatePostUserCase from "../use_cases/create_post_use_case";
import { TImageParams } from "../entities/image";

export default class PostController {
    public static Post(req:Request, res:Response) {
        var useCase:CreatePostUserCase = new CreatePostUserCase(req.session.currentUser!);        
        var post:Post = useCase.execute(req.file as TImageParams);

        res.send({
            user: post.user,
            image: post.image
        });
    }
}