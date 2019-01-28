import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';

import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule, //CalendarModule possui dependencia nesse modulo de animação para funcionar
    AppRoutingModule,

    LancamentosModule,
    PessoasModule,

    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
