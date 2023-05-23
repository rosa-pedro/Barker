import { User } from './user.model';

export interface Post {
  id: string;
  author?: User;
  title: string;
  message: string;
  likes: number;
  images?: string[];
  date: Date;
}
