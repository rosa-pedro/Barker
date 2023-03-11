import { User } from './user.model';

export interface Pet {
  name: string;
  id: string;
  owner: User;
  photos: string[];
}
