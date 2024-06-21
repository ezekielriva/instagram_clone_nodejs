import { NullUser } from "../entities/user";
import Post from "../entities/post";
import CreatePostUserCase from "./create_post_use_case";
import PostUseCase from "./post_use_case";
import { TImageParams } from "../entities/image";

describe("Create a Post", () => {
    test("it creates a post", () : void => {
        const user:NullUser = new NullUser();
        const imageParams:TImageParams = {
            fieldname: "",
            originalname: "",
            encoding: "",
            mimetype: "",
            destination: "",
            filename: "",
            path: "",
            size: 0
        };
        
        var useCase:CreatePostUserCase = new CreatePostUserCase(user);

        var post:Post = useCase.execute(imageParams);
        
        expect(post.image.filename).toBe("");
        expect(post.user.username).toBe("");
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