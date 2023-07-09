import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewPost, PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent {
  newPostForm!: FormGroup;
  imageURL: string = '';

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {
    this.newPostForm = this.fb.group({
      title: ['', [Validators.required]],
      photo: [null],
      content: ['', [Validators.required]],
    });
  }

  onPhotoSelect(event: any) {
    if (event.target.files.length > 0) {
      const photoFormControl = this.newPostForm.get('photo');

      if (photoFormControl !== null) {
        photoFormControl.setValue(event.target.files[0]);
        this.imageURL = this.newPostForm.value.photo.name;
        console.log(this.newPostForm.value.photo);
      }
    }
  }

  submit() {
    if (this.newPostForm.valid) {
      const post: NewPost = {
        title: this.newPostForm.value.title,
        content: this.newPostForm.value.content,
      };
      this.postService.addPost(post).subscribe({
        next: (value) => {
          this.postService
            .setPetPhoto(value.id, this.newPostForm.value.photo)
            .subscribe({
              next: () => {
                this.router.navigate(['./posts/' + value.id]);
              },
              error: (error) => console.log(error),
            });
        },
      });
    }
  }

  hasPhoto() {
    return this.newPostForm.value.photo !== null;
  }
}
