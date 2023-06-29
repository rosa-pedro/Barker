import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { Member } from '../../../core/models/member/member.model';
import { PetService } from './pet.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  baseUrl = environment.apiUrl;

  private memberSource = new BehaviorSubject<Member | null>(null);
  member$ = this.memberSource.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private petsService: PetService
  ) {}

  getMember(userName: string) {
    return this.http.get<Member>(this.baseUrl + 'users/' + userName).pipe(
      map((member: Member) => {
        if (member) {
          this.memberSource.next({
            ...member,
            lastActive: new Date(member.lastActive),
          });
        }
      })
    );
  }

  getPets() {
    return this.petsService.getPets();
  }

  isAuthenticatedUser(): boolean {
    let isAuthenticatedUser = false;
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        isAuthenticatedUser =
          user.userName === this.memberSource.value?.userName;
      }
    });
    return isAuthenticatedUser;
  }
}
