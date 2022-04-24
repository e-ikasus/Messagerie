import {Component, OnInit} from '@angular/core';
import {Message} from "../classes/Message";
import {Subscription} from "rxjs";
import {MessageService} from "../services/message.service";

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit
{
  public messages: Array<Message> = new Array<Message>();

  private subscription!: Subscription;

  constructor(private msgSrv: MessageService)
  {
  }

  ngOnInit(): void
  {
    this.subscription = this.msgSrv.register((value) =>
    {
      console.log("Actualisation de la liste des messages");

      this.messages = value
    });
  }

  ngOnDestroy(): void
  {
    this.msgSrv.unregister(this.subscription);
  }
}
