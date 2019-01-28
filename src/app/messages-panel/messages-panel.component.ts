import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {MessagesService} from '../services/messages.service';

@Component({
  selector: 'messages-panel',
  templateUrl: './messages-panel.component.html',
  styleUrls: ['./messages-panel.component.css']
})
export class MessagesPanelComponent implements OnInit {

  messages$: Observable<string[]>;

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    this.messages$ = this.messagesService.messages$;
  }

  close() {
    this.messagesService.message();
  }
}
