import ListPostsUseCase from ".";
import PostRepository from "../../adapters/memory/post_repository";
import Post from "../../entities/post";
import { BuildPost } from "../../spec/factories/post_factory";

describe("ListPostUseCase", ():void => {
    test("it returns posts for specific user", () => {
        var repository:PostRepository = new PostRepository();
        var useCase:ListPostsUseCase = new ListPostsUseCase(repository);
        var postUT:Post = BuildPost();

        repository.Create( BuildPost() );
        repository.Create( BuildPost() );
        repository.Create( BuildPost() );
        repository.Create( postUT );

        var posts:Post[] = useCase.execute({ UserId: postUT.user.id });

        expect(posts.length).toBe(1);
        expect(posts[0]).toBe(postUT);
    })
    test("it returns all posts", () => {
        var repository:PostRepository = new PostRepository();
        var useCase:ListPostsUseCase = new ListPostsUseCase(repository);

        repository.Create( BuildPost() );
        repository.Create( BuildPost() );

        var posts:Post[] = useCase.execute();

        expect(posts.length).toBe(2);
    })
});