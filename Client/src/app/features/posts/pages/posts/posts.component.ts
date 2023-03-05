import {Component} from '@angular/core';
import {Post} from "../../models/post.model";



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  posts: Post[] = [
    {title: 'Post1', smallMessage: 'this happened', likes: 7, nComments: 3},
    {title: 'Post2', smallMessage: 'this happened', likes: 7, nComments: 3},
    {title: 'Post3', smallMessage: 'this happened', likes: 7, nComments: 3},
    {title: 'Post4', smallMessage: 'this happened', likes: 7, nComments: 3},
    {title: 'Post5', smallMessage: 'this happened', likes: 7, nComments: 3},
    {title: 'Post6', smallMessage: 'this happened', likes: 7, nComments: 3},
    {title: 'Post7', smallMessage: 'this happened', likes: 7, nComments: 3},
  ]

}
