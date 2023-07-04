import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  newComment: FormControl = new FormControl<any>('', [Validators.required]);

  constructor(
    readonly commentsService: CommentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.commentsService
      .getComments(this.route.snapshot.params['id'])
      .subscribe((comments: Comment[] | void) => {
        console.log(comments);
      });
    const a = this.newComment.valid;
  }

  sendComment() {
    this.commentsService
      .sendComment(this.route.snapshot.params['id'], this.newComment.value)
      .subscribe({
        next: () => {
          this.newComment.setValue('');
        },
      });
  }

  goToProfile(author: string) {
    this.router.navigate(['profile', author]);
  }
}
