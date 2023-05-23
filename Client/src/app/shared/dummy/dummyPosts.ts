import { Post } from '../../core/models/post.model';
import { User } from '../../core/models/user.model';
import { users } from './users';

export let dummyPosts: Post[] = [
  {
    id: '1234',
    author: users[0],
    title: 'Walk your damn dog',
    message:
      'Loremsum doea commodo consequat. Duis aute irure dolor ' +
      'in reprehenderit in voluptate velit esse cillum dolore ' +
      'eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat ' +
      'ut labore et dolore magna aliqua. Ut enim ad minim ' +
      'veniam, quis nostrud exercitation ullamco laboris nisi ' +
      'ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
      'in reprehenderit in voluptate velit esse cillum dolore ' +
      'eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat ',
    likes: Math.floor(Math.random() * 100),
    images: [],
    date: new Date(),
  },
  {
    id: '4321',
    author: users[0],
    title: 'Collect the dodo from the ground',
    message:
      'Sit amet, consectetur ' +
      'adipiscing elit, sed do eiusmod tempor incididunt ' +
      'ut labore et dolore magna aliqua. Ut enim ad minim ' +
      'veniam, quis nostrud exercitation ullamco laboris nisi ' +
      'ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
      'in reprehenderit in voluptate velit esse cillum dolore ' +
      'eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat ' +
      'Lorem ipsum dolor sit amet, consectetur ' +
      'adipiscing elit, sed do eiusmod tempor incididunt ' +
      'ut labore et dolore magna aliqua. Ut enim ad minim ' +
      'veniam, quis nostrud exercitation ullamco laboris nisi ',
    likes: Math.floor(Math.random() * 100),
    images: [],
    date: new Date(),
  },
  {
    id: '5433',
    author: users[0],
    title: 'Let it goo',
    message:
      'Lorem tetur ' +
      'adipiscing elit, sed do eiusmod tempor incididunt ' +
      'ut labore et dolore magna aliqua. Ut enim ad minim ' +
      'veniam, quis nostrud exercitation ullamco laboris nisi ' +
      'ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
      'in reprehenderit in voluptate velit esse cillum dolore ' +
      'eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat ',
    likes: Math.floor(Math.random() * 100),
    images: [],
    date: new Date(),
  },
  {
    id: '7567',
    author: users[0],
    title: 'Happy ever after',
    message:
      'Lorem ipsum dolor sit amet, consectetur ' +
      'adipiscing elit, sed do eiusmod tempor incididunt ' +
      'ut labore et dolore magna aliqua. Ut enim ad minim ' +
      'veniam, quis nostrud exercitation ullamco laboris nisi ' +
      'ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
      'in reprehenderit in voluptate velit esse cillum dolore ' +
      'eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat ',
    likes: Math.floor(Math.random() * 100),
    images: [],
    date: new Date(),
  },
  {
    id: '7895',
    author: users[0],
    title: "Don't just sit there",
    message:
      'Lorem ipsum dolor sit amet, consectetur ' +
      'adipiscing elit, sed do eiusmod tempor incididunt ' +
      'ut labore et dolore magna aliqua. Ut enim ad minim ' +
      'veniam, quis nostrud exercitation ullamco laboris nisi ' +
      'ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
      'in reprehenderit in voluptate velit esse cillum dolore ' +
      'eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat ',
    likes: Math.floor(Math.random() * 100),
    images: [],
    date: new Date(),
  },
  {
    id: '0890',
    author: users[0],
    title: 'Get the hell up',
    message:
      'Lorem ipsum dolor sit amet, consectetur ' +
      'adipiscing elit, sed do eiusmod tempor incididunt ' +
      'ut labore et dolore magna aliqua. Ut enim ad minim ' +
      'veniam, quis nostrud exercitation ullamco laboris nisi ' +
      'ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
      'in reprehenderit in voluptate velit esse cillum dolore ' +
      'eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat ',
    likes: Math.floor(Math.random() * 100),
    images: [],
    date: new Date(),
  },
];
