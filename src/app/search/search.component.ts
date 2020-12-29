import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs'

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { AdministrativeDivisionPanama } from '../administrative-division-panama';

import { AdministrativeDivisionPanamaService } from '../administrative-division-panama.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  data$!: Observable<AdministrativeDivisionPanama[]>;
  private searchTerms = new Subject<string>()

  private provinces:any = []

  constructor(private administrativeDivisionPanamaService: AdministrativeDivisionPanamaService) {}
 
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.data$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.administrativeDivisionPanamaService.searchProvinces(term)),
    );
  }

  showProvincesInConsole(){
    this.administrativeDivisionPanamaService.getProvinces().subscribe((response) =>{
      console.log(this.provinces)
    });
  }
}
