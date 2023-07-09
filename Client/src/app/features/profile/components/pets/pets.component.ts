import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { ProfileService } from '../../services/profile.service';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent implements OnInit {
  @Input() active = false;
  constructor(
    readonly petService: PetService,
    readonly profileService: ProfileService,
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = { ...this.route.snapshot.queryParams };
    delete params['pet'];
    this.router.navigate([], { queryParams: params });
  }

  editPet(petId: number) {
    this.router.navigate(['edit-pet', { pet: petId }], {
      relativeTo: this.route,
    });
    console.log(this.route.snapshot.params);
  }

  deletePet(newPetModal: TemplateRef<any>, petId: number, petName: string) {
    this.modalService
      .open(newPetModal, { size: 'lg', title: petName })
      .subscribe((action) => {
        if (action === 'confirm') {
          this.petService.deletePet(petId).subscribe({
            next: () => {
              this.petService
                .getPets(this.route.snapshot.params['username'])
                .subscribe();
            },
          });
        }
      });
  }
}
