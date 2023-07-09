import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pet } from '../../../core/models/pet/pet.model';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  baseUrl = environment.apiUrl;

  private petsSource = new BehaviorSubject<Pet[] | null>(null);
  pets$ = this.petsSource.asObservable();

  private petSource = new BehaviorSubject<Pet | null>(null);
  pet$ = this.petSource.asObservable();

  constructor(private http: HttpClient) {}

  getPets(owner: string) {
    return this.http.get<Pet[]>(this.baseUrl + 'pets' + '?owner=' + owner).pipe(
      map((pets: Pet[]) => {
        if (pets && pets.length > 0) {
          this.petsSource.next(pets);
        }
      })
    );
  }

  getPet(id: number) {
    return this.http.get<Pet>(this.baseUrl + 'pets/' + id).pipe(
      map((pet: Pet) => {
        if (pet) {
          console.log(pet);
          this.petSource.next(pet);
        }
      })
    );
  }

  addPet(pet: Pet) {
    return this.http.post<Pet>(this.baseUrl + 'pets', pet);
  }

  setPetPhoto(petId: number, photo: File) {
    const data: FormData = new FormData();
    data.append('Photo', photo);

    return this.http.post(
      this.baseUrl + `pets/${petId}/set-profile-photo`,
      data
    );
  }

  deletePet(petId: number) {
    return this.http.delete<Pet>(this.baseUrl + 'pets/' + petId);
  }

  updatePet(pet: Pet) {
    return this.http.put(this.baseUrl + `pets/${pet.id}`, pet);
  }
}
