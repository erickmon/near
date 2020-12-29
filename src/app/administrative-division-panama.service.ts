import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AdministrativeDivisionPanama } from './administrative-division-panama';

import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AdministrativeDivisionPanamaService {

  constructor( 
      private http: HttpClient,
      private messageService: MessageService ) { }

  getProvinces(){
    const url ='https://raw.githubusercontent.com/erickmon/administrative-division-panama/gh-pages/json/provinces.json'
    return this.http.get(url)
  }

  getDistricts(){
    const url ='https://raw.githubusercontent.com/erickmon/administrative-division-panama/gh-pages/json/districts.json'
    return this.http.get(url)
  }

  getCorregimientos(){
    const url ='https://raw.githubusercontent.com/erickmon/administrative-division-panama/gh-pages/json/corregimientos.json'
    return this.http.get(url)
  }

  getSettlements(){
    const url ='https://raw.githubusercontent.com/erickmon/administrative-division-panama/gh-pages/json/settlements.json'
    return this.http.get(url)
  }

  searchProvinces(term: string): Observable<AdministrativeDivisionPanama[]> {
    if (!term.trim()) {
      return of();
    }

    const url ='https://raw.githubusercontent.com/erickmon/administrative-division-panama/gh-pages/json/provinces.json'

    return this.http.get<AdministrativeDivisionPanama[]>(`${url}?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`resultados para "${term}"`) :
         this.log(`sin resultados para "${term}"`)),
      catchError(this.handleError<AdministrativeDivisionPanama[]>('searchProvinces', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`AdministrativeDivisionPanamaService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} ha fallado: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

/* log, handleError y parte de searchProvinces (basado en searchHeroes):
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/