import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { DropdownOption } from '../../../../shared/components/dropdown/dropdown.component';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  genders: DropdownOption[] = [
    { code: 'male', value: 'Male' },
    { code: 'female', value: 'Female' },
  ];
  form!: FormGroup;
  private componentDestroyed$: Subject<boolean> = new Subject();

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  ngOnInit(): void {
    this.profileService.member$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        next: (member) => {
          if (member) {
            this.form = this.fb.group({
              firstName: [member.firstName],
              lastName: [member.lastName],
              gender: [member.gender],
              email: [member.email],
              phoneNumber: [member.phoneNumber],
              about: [member.about],
              country: [member.country],
              city: [member.city],
            });
          } else {
            this.profileService
              .getMember(this.route.snapshot.params['username'])
              .pipe(takeUntil(this.componentDestroyed$))
              .subscribe();
          }
        },
      });
  }

  changeGender($event: string) {
    console.log(this.form.get('gender'));
    this.form.patchValue({ gender: $event });
  }

  get gender() {
    return this.form.get('gender')?.value;
  }

  submit() {
    if (this.form.dirty) {
      this.profileService
        .updateProfile(this.form.value)
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe({
          next: () => {
            this.backToProfile();
          },
        });
    }
  }

  backToProfile() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
