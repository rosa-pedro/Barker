import { Post } from './post.model';

export interface FullPost extends Post {
  userVote?: number;
}
