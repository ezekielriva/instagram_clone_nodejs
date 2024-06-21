import NullUser from "../entities/null_user";
import Post from "../entities/post";
import CreatePostUserCase from "./create_post_use_case";
import PostUseCase from "./post_use_case";

describe("Create a Post", () => {
    test("it creates a post", () : void => {
        const user : NullUser = new NullUser();
        const image : string = "1234";
        
        var useCase:CreatePostUserCase = new CreatePostUserCase(user);

        var post:Post = useCase.execute(image);
        
        expect(post.image).toBe(image);
        expect(post.user).toBe(user);
    })
});

describe("List User Posts", () => {
    test("it returns user posts", () : void => {
        var useCase: PostUseCase = new PostUseCase();
        var user: NullUser = new NullUser();
        
        var posts: Post[] = useCase.ListPostsByUser(user);

        expect(posts.length).toBe(2);
    });
});