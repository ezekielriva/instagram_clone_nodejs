import { Request, RequestHandler, Response } from "express";
import ListProfileImagesUseCase from "../use_cases/list_profile_images_use_case";
import PostRepository from "../adapters/memory/post_repository";

const Show:RequestHandler = function(req: Request, res: Response) {
    var repository:PostRepository = PostRepository.getInstance();
    var useCase:ListProfileImagesUseCase = new ListProfileImagesUseCase(
        repository,
        req.session.currentUser!
    );

    res.status(200).send({
        user: req.session.currentUser,
        posts: useCase.execute()
    });
}

export default {
    Show: Show
};
