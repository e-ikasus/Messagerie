import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from "rxjs";
import {Message} from "../classes/Message";

@Injectable({
  providedIn: 'root'
})
export class MessageService
{
  private messages: Array<Message> = new Array<Message>();

  public observer: EventEmitter<Array<Message>>;

  /**
   * Construit la classe et remplis provisoirement la liste des messages.
   */

  constructor()
  {
    this.observer = new EventEmitter<Array<Message>>();

    this.populate();
  }

  /**
   * Prérempli la liste des messages.
   */

  private populate(): void
  {
    this.messages.push(new Message("toto", new Date(), "un premier message"));
    this.messages.push(new Message("tata", new Date(), "un deuxième message"));
    this.messages.push(new Message("titi", new Date(), "un troisième message"));
    this.messages.push(new Message("tutu", new Date(), "un quatrième message"));
    this.messages.push(new Message("toto", new Date(), "un cinquième message"));
    this.messages.push(new Message("toto", new Date(), "un sixième message"));
  }

  /**
   * Notifie les observateurs d'un changement de la liste des messages.
   *
   * @private
   */

  private notifier(): void
  {
    this.observer.emit(this.messages);
  }

  /**
   * Ajoute un message à la liste des messages.
   *
   * @param msg
   */

  public add(msg: Message): void
  {
    // Ajoute un message à la liste.
    this.messages.push(msg);

    // Puis informe les observateurs du changement.
    this.notifier();
  }

  /**
   * Enregistrement d'un observateur.
   *
   * @param fct
   */

  public register(fct: (value: Message[]) => void): Subscription
  {
    // Attache l'observateur.
    let result: Subscription = this.observer.subscribe(fct);

    // Et envoie-lui le contenu initial de la liste.
    fct(this.messages);

    // Retourne la subscription.
    return result;
  }

  /**
   * Retrait d'un observateur.
   *
   * @param subscription
   */

  public unregister(subscription: Subscription)
  {
    subscription.unsubscribe()
  }
}
