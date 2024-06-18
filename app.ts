import express, { Application, Request, Response } from "express";
import UserUseCase from "./use_cases/user_use_case";
import User from "./entities/user";
import PostUseCase from "./use_cases/post_use_case";
import Post from "./entities/post";
import NullUser from "./entities/null_user";

const app : Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) : void => {
    res.send({ hello: "world" });
});

app.post("/users", (req: Request, res: Response) : void => {
    var useCase : UserUseCase = new UserUseCase();
    var user : User = useCase.CreateUser(
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

app.post("/posts", (req: Request, res: Response) : void => {
    var useCase : PostUseCase = new PostUseCase();
    var user : User = new User(
        req.body.user.name,
        req.body.user.email,
        req.body.user.password,
        req.body.user.username
    );
    var post : Post = useCase.CreatePost(
        user,
        req.body.image
    );

    res.send({
        user: post.user,
        image: post.image
    });
});

export default app;