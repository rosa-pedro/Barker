import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent implements OnInit {
  constructor(readonly petService: PetService) {}

  ngOnInit(): void {
    this.petService.getPets().subscribe((x) => {
      console.log(x);
    });
  }
}
