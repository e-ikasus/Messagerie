import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Messagerie';
  titreGauche : string = "Personnes actives:";
  titreBottom : string = "Nouveau message:";
}
