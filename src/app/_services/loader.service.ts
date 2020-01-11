
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public status = new EventEmitter();
  // public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
  display(value: boolean, text?: any) {
    this.status.next({ value, text });
  }

  private data: Number;

  setOption(value) {
    this.data = value;
  }

  getOption() {
    return this.data;
  }
}
