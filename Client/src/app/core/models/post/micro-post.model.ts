import { Post } from './post.model';

export interface MicroPost extends Post {
  numberOfComments?: number;
}
