import NullUser from "../../entities/null_user";
import Post from "../../entities/post";
import PostUseCase from "../../use_cases/post_use_case";

describe("Create a Post", () => {
    test("it creates a post", () => {
        const user : NullUser = new NullUser();
        const image : string = "1234";
        
        var useCase : PostUseCase = new PostUseCase();
        var post : Post = useCase.CreatePost(user, image);

        expect(post.image).toBe(image);
        expect(post.user).toBe(user);
    })
});