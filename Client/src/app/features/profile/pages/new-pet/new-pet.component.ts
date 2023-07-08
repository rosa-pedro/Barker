import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownOption } from '../../../../shared/components/dropdown/dropdown.component';
import { Pet } from '../../../../core/models/pet/pet.model';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-new-pet',
  templateUrl: './new-pet.component.html',
  styleUrls: ['./new-pet.component.scss'],
})
export class NewPetComponent {
  imageURL: any;
  form!: FormGroup;

  genders: DropdownOption[] = [
    { code: 'male', value: 'Male' },
    { code: 'female', value: 'Female' },
  ];
  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      photo: [''],
      gender: [''],
      type: ['', [Validators.required]],
      dateOfBirth: [''],
      about: [''],
    });
  }

  hasPhoto() {
    return this.form.value.photo !== '';
  }

  submit() {
    if (this.form.valid) {
      const pet: Pet = this.form.value;
      this.petService.addPet(pet).subscribe({
        next: (value) => {
          this.router.navigate(
            ['./profile/' + this.route.snapshot.params['username']],
            { queryParams: { tab: 'pets' } }
          );
          console.log(value);
        },
      });
    }
  }

  changeGender($event: string) {
    this.form.patchValue({ gender: $event });
    console.log('gender');
  }
}
