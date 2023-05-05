import { User } from './user.model';
import { Pet } from './pet.model';
import { Post } from './post.model';

export interface FullUser extends User {
  photos: string[];
  pets: Pet[];
  posts: Post[];
}
