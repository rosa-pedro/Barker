import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pet } from '../../../core/models/pet/pet.model';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  baseUrl = environment.apiUrl;

  private petsSource = new BehaviorSubject<Pet[] | null>(null);
  pets$ = this.petsSource.asObservable();
  constructor(private http: HttpClient) {}

  getPets(owner: string) {
    let body = { owner: owner };
    let params = new HttpParams().set('requestData', JSON.stringify(body));
    return this.http.get<Pet[]>(this.baseUrl + 'pets', { params: params }).pipe(
      map((pets: Pet[]) => {
        if (pets) {
          this.petsSource.next(pets);
        }
      })
    );
  }
}
