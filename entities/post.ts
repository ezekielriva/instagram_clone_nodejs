import Image, { NullImage } from "./image";
import User, { NullUser } from "./user";

export type TPostId = string | number | null | undefined;

export default class Post {
    id: TPostId;
    user: User;
    image: Image;

    constructor(user: User, image: Image) {
        this.user = user;
        this.image = image;
    }
}

export class NullPost extends Post {
    constructor() {
        super(new NullUser, new NullImage);
    }
}