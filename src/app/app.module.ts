import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { AppRoutingModule } from './app-routing.module';
// import { LoginFormComponent } from './seguranca/login-form/login-form.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, //CalendarModule e ToastrModule possui dependencia nesse modulo de animação para funcionar
    
    CoreModule,
    LancamentosModule,
    PessoasModule,
    SegurancaModule,
    AppRoutingModule//repasse de rotas
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
