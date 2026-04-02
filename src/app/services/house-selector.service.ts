import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HouseSelectorService {
  private refresh$ = new BehaviorSubject<void>(undefined);

  emitRefresh() {
    this.refresh$.next(undefined);
  }

  consumeRefresh() {
    return this.refresh$.asObservable();
  }
}
