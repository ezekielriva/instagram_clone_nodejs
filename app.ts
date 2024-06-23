import express, { Application, Request, RequestHandler, Response } from "express";
import session from "express-session";
import dotenv from "dotenv";
import crypto from "crypto";
import multer from "multer";
import path from "path";
import fs from "fs";

import LoggerMiddleware from "./middlewares/logger_middleware";

import User from "./entities/user";

import AuthenticationController from "./controllers/authentication_controller";
import PostController from "./controllers/post_controller";
import UserController from "./controllers/user_controller";
import ProfileController from "./controllers/profile_controller";
import FollowerController from "./controllers/follower_controller";

const app : Application = express();

dotenv.config();

declare module "express-session" {
    interface SessionData {
        auth_token?:string
        currentUser?:User
    }
}

const upload = multer({ 
    storage: multer.memoryStorage()
});

const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)){
    fs.mkdirSync(uploadFolder);
}


app.use(express.json());
app.use(LoggerMiddleware);
app.use(session({
    secret: crypto
        .createHmac("sha256", process.env.SESSION_SECRET!)
        .digest("hex"),
    resave: false,
    saveUninitialized: true,
}));



app.get("/", (req: Request, res: Response) : void => {
    res.send({ hello: "world" });
});

app.post("/users",
    UserController.Create
);

app.get("/users/:userId/posts", 
    AuthenticationController.isAuthenticated,
    PostController.Index
);

app.post("/users/:userId/follow",
    AuthenticationController.isAuthenticated,
    FollowerController.Create
);

app.get("/profile", 
    AuthenticationController.isAuthenticated,
    ProfileController.Show
);

app.post("/auth/sign_in", 
    AuthenticationController.SignIn
);

app.post("/posts", 
    AuthenticationController.isAuthenticated, 
    upload.single("image"),
    PostController.Create
);

export default app;