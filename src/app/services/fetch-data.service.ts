import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Result } from "./../types/result-items";
import { delay } from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  totalItems: number = 100;

  constructor() { }

  getItems(page: number = 1, itemsPerPage: number = 10): Observable<Result> {
    const startIndex = (page - 1)*itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const finalResult: Result = {
      items: [], 
      endPage: false
    };
    
    if(endIndex === this.totalItems) finalResult.endPage = true;

    for (let i = startIndex; i < endIndex; i++) {
      if(i < this.totalItems) finalResult.items.push(`Item ${i + 1}`);
    }

    return of(finalResult).pipe(delay(1000));
  }
}
