import express, { Application, Request, Response } from "express";
import UserUseCase from "./use_cases/create_user_use_case";
import User from "./entities/user";
import PostUseCase from "./use_cases/post_use_case";
import Post from "./entities/post";
import NullUser from "./entities/null_user";
import FollowerUseCase from "./use_cases/follower_use_case";
import UserRepositoryMemory from "./adapters/memory/user_repository";
import CreateUserUseCase from "./use_cases/create_user_use_case";

const app : Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) : void => {
    res.send({ hello: "world" });
});

app.post("/users", (req: Request, res: Response) : void => {
    var memoryDB: UserRepositoryMemory = new UserRepositoryMemory();
    var useCase : CreateUserUseCase = new CreateUserUseCase(memoryDB);
    var user : User = useCase.execute(
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.username
    );

    res.send({ 
        name: user.name,  
        username: user.username,
        email: user.email
    });
});

app.get("/users/:userId/posts", (req: Request, res: Response): void => {
    var useCase : PostUseCase = new PostUseCase();
    var user : NullUser = new NullUser();
    var posts : Post[] = useCase.ListPostsByUser(user);

    res.send({ posts: posts })
});

app.post("/users/:userId/follow", (req: Request, res: Response): void => {
    var user : User = new User("name", "mail", "pass", "username");
    var currentUser : User = new User("name", "mail", "pass", "username");
    var useCase : FollowerUseCase = new FollowerUseCase(user);
    var result : boolean = useCase.FollowUser(currentUser);
    var status : number = (result)? 200 : 401

    res.status(status).send({});
});

app.post("/posts", (req: Request, res: Response) : void => {
    var useCase : PostUseCase = new PostUseCase();
    var currentUser : User = new User("name", "mail", "pass", "username");
    var post : Post = useCase.CreatePost(
        currentUser,
        req.body.image
    );

    res.send({
        user: post.user,
        image: post.image
    });
});

export default app;