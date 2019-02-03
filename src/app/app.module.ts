import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';

import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';
import { LancamentoService } from './lancamentos/lancamento.service';
import { PessoaService } from './pessoas/pessoa.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule, //CalendarModule e ToastrModule possui dependencia nesse modulo de animação para funcionar
    AppRoutingModule,
    HttpClientModule,

    ToastrModule.forRoot({positionClass: 'toast-bottom-right'}),

    LancamentosModule,
    PessoasModule,
    CoreModule
  ],
  providers: [
    LancamentoService,
    PessoaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
