import Post from "../../entities/post";
import { TUserID } from "../../entities/user";

export type TListParams = {
    UserId: TUserID
}

export default interface PostRepository {
    Create(post:Post):Post;
    List(listParams:TListParams): Post[];
    ListAll():Post[];
}