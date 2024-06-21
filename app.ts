import express, { Application, Request, Response } from "express";
import session from "express-session";
import dotenv from "dotenv";
import crypto from "crypto";

import User from "./entities/user";
import PostUseCase from "./use_cases/post_use_case";
import Post from "./entities/post";
import NullUser from "./entities/null_user";
import FollowerUseCase from "./use_cases/follower_use_case";
import CreateUserUseCase from "./use_cases/create_user_use_case";

import { UserRepository } from "./adapters/memory"

import LoggerMiddleware from "./middlewares/logger_middleware";

import AuthenticationController from "./controllers/authentication_controller";
import PostController from "./controllers/post_controller";
import UserController from "./controllers/user_controller";

const app : Application = express();

dotenv.config();

declare module "express-session" {
    interface SessionData {
        auth_token?:string
        currentUser?:User
    }
}

app.use(express.json());
app.use(LoggerMiddleware);
app.use(session({
    secret: crypto
        .createHmac("sha256", process.env.SESSION_SECRET || "default")
        .digest("hex"),
    resave: false,
    saveUninitialized: true,
}));

app.get("/", (req: Request, res: Response) : void => {
    res.send({ hello: "world" });
});

app.post("/users", UserController.Post);

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

app.post("/auth/sign_in", 
    AuthenticationController.SignIn
);

app.post("/posts", 
    AuthenticationController.isAuthenticated, 
    PostController.Post
);

export default app;