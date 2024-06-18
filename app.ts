import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import UserUseCase from "./use_cases/user_use_case";
import User from "./entities/user";
import { userInfo } from "os";

const app : Application = express();

app.use(bodyParser.json());

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

export default app;