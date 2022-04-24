import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../services/message.service";
import {Message} from "../classes/Message";

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit
{
  @Input()
  public titreBottom: string = "";

  public newMsgForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private msgSrv: MessageService)
  {
    // Create the object representation of the form.
    this.createForm();
  }

  ngOnInit(): void
  {
  }

  private createForm(): void
  {
    let authorControl = new FormControl("", [Validators.required, Validators.minLength(4)]);
    let messagerControl = new FormControl("", [Validators.required, Validators.minLength(4)]);

    this.newMsgForm = this.formBuilder.group({author: authorControl, message: messagerControl});
  }

  public addMessage(): void
  {
    // Add a message to the list.
    if (this.checkAuthor() && (this.checkMessage()))
    {
      this.msgSrv.add(new Message(this.newMsgForm.controls["author"].value, new Date(), this.newMsgForm.controls["message"].value));
    }
  }

  resetForm()
  {
    // Reset the form.
    this.newMsgForm.reset();
  }

  public checkAuthor(): boolean
  {
    return this.checkField("author");
  }

  public checkMessage(): boolean
  {
    return this.checkField("message");
  }

  public checkField(name: string): boolean
  {
    let input : AbstractControl = this.newMsgForm.controls[name];

    // Return the validity state of the named field.
    return !(input.invalid);
  }
}
