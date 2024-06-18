import NullUser from "./null_user"
import Post from "./post";

export default class NullPost extends Post {
    constructor() {
        var user : NullUser = new NullUser();
        super(user, "noop");
    }
}