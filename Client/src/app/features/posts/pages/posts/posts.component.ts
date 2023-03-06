import { Component } from '@angular/core';
import { MicroPost } from '../../models/micro-post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  posts: MicroPost[] = [
    {
      id: '4321',
      title: 'Post1',
      message:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m',
      likes: 7,
      numberOfComments: 3,
    },
    {
      id: '1234',
      title: 'Post2',
      message:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m',
      likes: 7,
      numberOfComments: 3,
    },
    {
      id: '5678',
      title: 'Post3',
      message:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m',
      likes: 7,
      numberOfComments: 3,
    },
    {
      id: '8765',
      title: 'Post4',
      message:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m',
      likes: 7,
      numberOfComments: 3,
    },
    {
      id: '0987',
      title: 'Post5',
      message:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m',
      likes: 7,
      numberOfComments: 3,
    },
    {
      id: '6574',
      title: 'Post6',
      message:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m',
      likes: 7,
      numberOfComments: 3,
    },
  ];

}
