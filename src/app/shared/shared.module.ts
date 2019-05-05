import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MensagemComponent } from './mensagem/mensagem.component';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [
    MensagemComponent
  ],
  imports: [
    CommonModule,

    MessagesModule,
    MessageModule,
  ],
  exports: [
    MessagesModule,
    MessageModule,
    MensagemComponent
  ]
})
export class SharedModule { }
