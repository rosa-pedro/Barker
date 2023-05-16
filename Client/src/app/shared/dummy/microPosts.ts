import { MicroPost } from '../../core/models/micro-post.model';
import { dummyPosts } from './dummyPosts';

export let microPosts: MicroPost[] = [];

for (let p of dummyPosts) {
  microPosts.push({
    ...p,
    message: p.message.substring(0, 100),
    numberOfComments: Math.floor(
      Math.random() * 100
    ),
  });
}
