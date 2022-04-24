import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MessageService} from "../services/message.service";

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css']
})
export class AuthorsListComponent implements OnInit
{
  @Input()
  titreGauche: String = "";

  public listAuteurs: string[] = [];

  private subscription!: Subscription;

  constructor(private msgSrv: MessageService)
  {
  }

  ngOnInit(): void
  {
    this.subscription = this.msgSrv.register((value) =>
    {
      let list: string[] = [];

      value.forEach(function (message)
      {
        if (list.findIndex(function (auteur, idx, list)
        {
          return (message.nom.localeCompare(auteur) == 0);
        }) == -1)
        {
          list.push(message.nom)
        }
      })

      console.log("Actualisation de la liste des auteurs");

      this.listAuteurs = list;
    });
  }

  ngOnDestroy() : void
  {
    this.msgSrv.unregister(this.subscription);
  }
}
