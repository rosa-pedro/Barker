import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownOption } from '../../../../shared/components/dropdown/dropdown.component';
import { Pet } from '../../../../core/models/pet/pet.model';
import { PetService } from '../../services/pet.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-new-pet',
  templateUrl: './new-pet.component.html',
  styleUrls: ['./new-pet.component.scss'],
})
export class NewPetComponent implements OnInit {
  imageURL: any;
  form!: FormGroup;

  isEdit = false;

  genders: DropdownOption[] = [
    { code: 'male', value: 'Male' },
    { code: 'female', value: 'Female' },
  ];

  private componentDestroyed$: Subject<boolean> = new Subject();

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (!this.isEdit) {
      console.log(this.isEdit);
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        photo: [null],
        gender: [''],
        type: ['', [Validators.required]],
        dateOfBirth: [''],
        about: [''],
      });
    }
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['pet']);
    if (this.route.snapshot.params['pet']) {
      console.log('hey');
      this.isEdit = true;
      this.petService.pet$.pipe(takeUntil(this.componentDestroyed$)).subscribe({
        next: (pet) => {
          if (pet) {
            console.log(pet);
            this.form = this.fb.group({
              name: [pet.name],
              photo: [null],
              type: [pet.type],
              gender: [pet.gender],
              about: [pet.about],
              id: [pet.id],
            });
          } else {
            this.petService
              .getPet(this.route.snapshot.params['pet'])
              .pipe(takeUntil(this.componentDestroyed$))
              .subscribe();
          }
        },
      });
    }
  }

  hasPhoto() {
    return this.form.value.photo !== null;
  }

  onPhotoSelect(event: any) {
    if (event.target.files.length > 0) {
      const photoFormControl = this.form.get('photo');

      if (photoFormControl !== null) {
        photoFormControl.setValue(event.target.files[0]);
        this.imageURL = this.form.value.photo.name;
      }
    }
  }

  submit() {
    if (this.form.valid) {
      const pet: Pet = this.form.value;
      if (this.isEdit && (this.form.dirty || pet.photo)) {
        if (!this.form.dirty) {
          this.setPhoto(pet.id, pet.photo);
        } else {
          this.petService.updatePet(pet).subscribe({
            next: () => {
              if (pet.photo) {
                console.log(pet.photo);
                this.setPhoto(pet.id, pet.photo);
              } else {
                this.router.navigate(
                  ['./profile/' + this.route.snapshot.params['username']],
                  { queryParams: { tab: 'pets' } }
                );
              }
            },
          });
        }
      } else {
        console.log('wrong');
        this.petService.addPet(pet).subscribe({
          next: (value) => {
            this.setPhoto(value.id, pet.photo);
          },
        });
      }
    }
  }

  setPhoto(id: number, photo: File) {
    this.petService.setPetPhoto(id, photo).subscribe({
      next: () => {
        this.router.navigate(
          ['./profile/' + this.route.snapshot.params['username']],
          { queryParams: { tab: 'pets' } }
        );
      },
      error: (error) => console.log(error),
    });
  }

  backToProfile() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  changeGender($event: string) {
    this.form.patchValue({ gender: $event });
  }
}
