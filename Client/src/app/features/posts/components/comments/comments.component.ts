import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  newComment: FormControl = new FormControl<string>('', [Validators.required]);

  constructor(
    readonly commentsService: CommentsService,
    private route: ActivatedRoute,
    private router: Router,
    readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.commentsService
        .getComments(this.route.snapshot.params['id'])
        .subscribe(() => {});
    }
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
