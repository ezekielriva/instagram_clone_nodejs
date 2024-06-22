import Post from "../../entities/post";
import User from "../../entities/user";
import Image from "../../entities/image";
import { BuildImage } from "./image_factory";
import { BuildUser } from "./user_factory";

export function BuildPost():Post {
    var user:User = BuildUser();
    var image:Image = BuildImage();
    
    return new Post(user, image);
}

export function BuildPostWithUser(user:User):Post {
    var image:Image = BuildImage();
    
    return new Post(user, image)
}