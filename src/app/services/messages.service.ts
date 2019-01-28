import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private messages = new BehaviorSubject<string[]>([]);
  messages$: Observable<string[]> = this.messages.asObservable();

  constructor() { }

  message(...messages: string[]) {
    this.messages.next(messages);
  }

}
