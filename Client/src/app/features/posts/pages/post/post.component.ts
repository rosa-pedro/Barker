import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  constructor(public postService: PostService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.postService.getPost(this.route.snapshot.params['id']).subscribe({
      next: () => {},
      error: (err) => {
        console.log(err);
      },
    });
  }

  upVote() {
    this.postService.upVote(this.route.snapshot.params['id']).subscribe();
  }

  downVote() {
    this.postService.downVote(this.route.snapshot.params['id']).subscribe();
  }
}
