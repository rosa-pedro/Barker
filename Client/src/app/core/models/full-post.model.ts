import { Post } from "./post.model";
import { Comment } from "./comment.model";

export interface FullPost extends Post {
  comments: Comment[]
}
