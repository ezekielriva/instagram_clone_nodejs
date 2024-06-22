import ListProfileImagesUseCase from ".";
import PostRepository from "../../adapters/memory/post_repository";
import Post from "../../entities/post";
import User from "../../entities/user";
import { BuildPost, BuildPostWithUser } from "../../spec/factories/post_factory";
import { BuildUser } from "../../spec/factories/user_factory";

describe("ListProfileImagesUseCase", ():void => {
    it("returns user profile images", () => {
        var repository:PostRepository = new PostRepository();
        var user:User = BuildUser();
        
        var postUT:Post = repository.Create(
            BuildPostWithUser(user)
        );

        repository.Create( BuildPost() )
        repository.Create( BuildPost() )
        repository.Create( BuildPost() )

        var useCase:ListProfileImagesUseCase = new ListProfileImagesUseCase(
            repository,
            user,
        );
        var posts:Post[] = useCase.execute();

        expect(posts.length).toBe(1);
        expect(posts[0]).toBe(postUT);
    });
});