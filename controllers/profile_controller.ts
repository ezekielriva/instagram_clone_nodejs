import { Request, Response } from "express";
import ListProfileImagesUseCase from "../use_cases/list_profile_images_use_case";
import PostRepository from "../adapters/memory/post_repository";

export default class ProfileController {
    /**
     * Get
     */
    public static Get(req: Request, res: Response) {
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
}