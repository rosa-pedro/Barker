import { FullPost } from '../../core/models/full-post.model';
import { dummyPosts } from './dummyPosts';

const possibilities = [true, false];

export let fullPosts: FullPost[] = [];

for (let p of dummyPosts) {
  fullPosts.push({
    ...p,
    liked:
      possibilities[Math.round(Math.random())],
    comments: [],
  });
}
