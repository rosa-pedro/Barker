import { FullUser } from '../../core/models/full-user.model';
import { users } from './users';

export let fullUsers: FullUser[] = [
  {
    ...users[0],
    photos: [],
    pets: [],
    posts: [],
  },
];
