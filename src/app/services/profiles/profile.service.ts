import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { MessageService } from '../messages/message.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Profile } from './profile';



@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  private profilesUrl = '/api/profiles';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private localStorage: LocalStorageService
  ) { }

  public getProfiles(): any {

    const result = new Subject();
    const localData = this.localStorage.getItem('Profiles');
    localData.then(value => {
      if (value) {
        result.next(value);
        console.log('localstorage');
      } else {
        console.log('backend');
        this.http.get<Profile[]>(this.profilesUrl)
          .pipe(
            tap(_ => this.log('Profiles fetched', 'ok')),
            catchError(this.handleError<Profile[]>('getProfiles', []))
          ).subscribe(value => {
            result.next(value);
            this.localStorage.setItem('Profiles', value);
          });
      }
    })

    return result;
  }

  public getProfile(id: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.profilesUrl}/${id}`)
      .pipe(
        tap(() => this.log('Profile fetched', 'ok')),
        catchError(this.handleError<Profile>('getProfile')) 
      )
  }

  public addProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${this.profilesUrl}`, profile)
      .pipe(
        tap(() => this.log('Profile added', 'ok')),
        catchError(this.handleError<Profile>('addProfile'))
      )
  }

  public updateProfile(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.profilesUrl}`, profile)
      .pipe(
        tap(() => this.log('Profile update', 'ok')),
        catchError(this.handleError<Profile>('updateProfile'))
      )
  }

  public deleteProfile(id: string){
    console.log(id);
    return this.http.delete(`${this.profilesUrl}/${id}`)
      .pipe(
        tap(() => this.log('Profile removed', 'ok')),
        catchError(this.handleError<Profile>('removeProfile'))
      )
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`, 'error');
      return of(result as T);
    }
  }
  
  private log(message: string, type: string) {
    this.messageService.add({content: `App: ${message}`, type });
  }

}
