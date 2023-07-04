import { Component, Input } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent {
  @Input() active = false;
  constructor(
    readonly petService: PetService,
    readonly profileService: ProfileService
  ) {}
}
