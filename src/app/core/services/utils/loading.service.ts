import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  get loading() {
    return this.loadingSubject.asObservable();
  }
  show() {
    this.loadingSubject.next(true);
    console.log(1);
  }

  hide() {
    console.log(0);
    this.loadingSubject.next(false);
  }
}
