import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
  <p-message severity="error" text="{{ texto }}" *ngIf="temErro()"></p-message>
  `,
  styles: []
})
export class MessageComponent {
@Input() erro: string;
@Input() controle: FormControl;
@Input() texto: string;

temErro(): boolean {
  return this.controle.hasError(this.erro) && this.controle.dirty;
}

}
